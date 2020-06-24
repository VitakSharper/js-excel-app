import {ExcelComponent} from "@core/ExcelComponent";
import * as actions from "@/redux/actions"
import {$} from "@core/dom";
import {defaultTitle} from "@/constants";

export class Header extends ExcelComponent {
    static className = 'header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            // init input listener
            listeners: ['input'],
            ...options
        });
    }

    prepare() {
        // if we wont to debounce only the header input
        //this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().tableTitle || defaultTitle
        return `
         <input type="text" class="header__input" value="${title}"/>
            <div class="header__btn-group">
                <button class="btn"><i class="material-icons">exit_to_app</i></button>
                <button class="btn --red"><i class="material-icons">delete</i></button>
            </div>
        `
    }

    // listen the input and dispatch input value to store
    onInput(event) {
        this.$dispatch(actions.modifyTitle($(event.target).text()))
    }
}
