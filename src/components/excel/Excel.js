import {$} from "@core/dom";
import {Emitter} from "@core/Emitter";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        // import store in app
        this.store = options.store
        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create('main', ['excel'])

        const componentOptions = {
            emitter: this.emitter,
            // implement store
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create($.getNodeForComponent(Component.name), [Component.className])
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(c => c.init())
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}
