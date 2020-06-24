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
            subscribe: ['currentStyles'],
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

    storeModified(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'btn') {
            const cssDeclaration = JSON.parse($target.data.css)
            this.$emit('toolbar:applyStyle', cssDeclaration)
        }
    }
}
