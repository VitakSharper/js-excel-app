import {DomListener} from "@core/DomListener"

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.prepare()
    }

    prepare() {
    }

    // return template of the component
    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDomListeners()
    }
}
