import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = 'formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input'],
            ...options
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
        const text = event.target.textContent.trim()
        this.emitter.emit('is working!', text)
    }

}
