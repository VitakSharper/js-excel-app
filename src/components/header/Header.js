import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'header'

    toHTML() {
        return `
         <input type="text" class="header__input" value="new table"/>
            <div class="header__btn-group">
                <button class="btn"><i class="material-icons">exit_to_app</i></button>
                <button class="btn --red"><i class="material-icons">delete</i></button>
            </div>
        `
    }
}
