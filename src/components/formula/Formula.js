import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = 'formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }

    toHTML() {
        return `
         <div class="formula__info">fx</div>
            <div class="formula__input" contenteditable="true" spellcheck="false"></div>
        `
    }

    onInput(event) {
        console.log(this.$root)
        console.log('on input of formula: ', event.target.textContent.trim())
    }

    onClick(event) {
        console.log('on click of formula: ')
    }
}
