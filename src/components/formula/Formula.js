import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
    static className = 'formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
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
            this.$formula.text($cell.text())
        })
        // receive data from current cell
        // this.$on('table:input', $cell => {
        //     this.$formula.text($cell.text())
        // })
        // subscribe to state and get current cell value
        this.$subscribe(state => {
            this.$formula.text(state.currentCellValue)
        })
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
