import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {getGroupOfCells, isCell, nextSelector, shouldResize} from "@/components/table/table.functions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import {checkCellRange} from "@core/utils";

export class Table extends ExcelComponent {
    static className = 'table'
    rowsToCreate = 25

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options
        });
    }

    toHTML() {
        return createTable(this.rowsToCreate)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-col="A1"]')
        this.selection.select($cell)

        this.emitter.subscribe('is working!', text => console.log('in table: ', text))
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            if (event.shiftKey) {
                const currentCell = this.selection.current.getCellId()
                const targetCell = $(event.target).data.col

                this.selection.selectGroup(
                    getGroupOfCells(currentCell, targetCell)
                        .map(id => this.$root.find(`[data-col="${id}"]`)))
            } else {
                this.selection.select($(event.target))
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp']
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const currentCell = this.selection.current.getCellId()
            const $nextCell = this.$root.find(
                nextSelector(key, currentCell, this.rowsToCreate - 1, checkCellRange))
            this.selection.select($nextCell)
        }
    }

}
