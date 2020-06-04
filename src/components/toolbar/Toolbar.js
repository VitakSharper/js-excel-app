import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";

export class Toolbar extends ExcelStateComponent {
    static className = 'toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        })
    }

    get template() {
        return createToolbar(this.state)
    }

    prepare() {
        this.initState(defaultStyles)
    }

    toHTML() {
        return this.template
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'btn') {
            const cssDeclaration = JSON.parse($target.data.css)
            this.$emit('toolbar:applyStyle', cssDeclaration)

            const cssProperty = Object.keys(cssDeclaration)[0]
            this.setState({[cssProperty]: cssDeclaration[cssProperty]})
        }
    }
}
