import {formatListenerName} from "@core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener.`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = formatListenerName(listener)
            if (!this[method]) throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component.`)
            // !!! ability to remove the listener
            this[method] = this[method].bind(this)
            // addEventListener in Dom
            this.$root.on(listener, this[method])
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = formatListenerName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

