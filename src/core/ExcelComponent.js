import {DomListener} from "@core/DomListener"

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        // implement store
        this.store = options.store
        this.storeSubscribe = null
        this.unsuscribers = []

        this.prepare()
    }

    // run before init()
    prepare() {
    }

    // return template of the component
    toHTML() {
        return ''
    }

    // emitting
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // subscribing
    $on(event, fn) {
        const unsubscribe = this.emitter.subscribe(event, fn)
        this.unsuscribers.push(unsubscribe)
    }

    // implement store methods
    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        this.storeSubscribe = this.store.subscribe(fn)
    }

    // initialize component
    init() {
        this.initDOMListeners()
    }

    // unsubscribing
    destroy() {
        this.removeDomListeners()
        this.unsuscribers.forEach(unsubscribe => unsubscribe())
        this.storeSubscribe.unsubscribe()
    }
}
