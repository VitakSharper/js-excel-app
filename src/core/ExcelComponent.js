import {DomListener} from "@core/DomListener"

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.prepare()
        this.unsuscribers = []
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

    // initialize component
    init() {
        this.initDOMListeners()
    }

    // unsubscribing
    destroy() {
        this.removeDomListeners()
        this.unsuscribers.forEach(unsubscribe => unsubscribe())
    }
}
