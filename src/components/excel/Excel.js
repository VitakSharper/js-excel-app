import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('main', ['excel'])
        this.components = this.components.map(Component => {
            const $el = $.create($.getNodeForComponent(Component.name), [Component.className])
            const component = new Component($el)

            if (component.name) {
                window['c' + component.name] = component
            }

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
}
