import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
    static className = 'formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentCellValue'],
            ...options
        });
    }

    toHTML() {
        return `
            <div class="formula__info">fx</div>
            <input id="formula" class="formula__input" type="text"  spellcheck="false"/>
        `
    }

    init() {
        super.init();
        this.$formula = this.$root.find('#formula')
        // show selected cell value in formula input
        this.$on('table:select', $cell => {
            // get value from data attribute into formula input
            this.$formula.text($cell.data.value)
        })
    }

    // subscribe to state and get current cell value
    storeModified({currentCellValue}) {
        this.$formula.text(currentCellValue)
    }

    // emit value from formula input to selected cell
    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}
