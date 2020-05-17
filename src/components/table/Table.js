import {ExcelComponent} from "@core/ExcelComponent";

export class Table extends ExcelComponent {
    static className = 'table'
    toHTML() {
        return `<h1>Table</h1>`
    }
}
