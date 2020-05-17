import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('main', ['excel'])
        this.components.forEach(Component => {
            const $el = $.create($.getNodeForComponent(Component.name), [Component.className])
            const component = new Component($el)
            $el.html(component.toHTML())
            $root.append($el)
        })
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
    }
}
