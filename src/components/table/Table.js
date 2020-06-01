import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {getGroupOfCells, isCell, nextSelector, shouldResize} from "@/components/table/table.functions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import {checkCellRange} from "@core/utils";

import * as actions from "@/redux/actions"

export class Table extends ExcelComponent {
    static className = 'table'
    rowsToCreate = 25

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-col="A1"]'))
        // insert text in current cell from formula component
        this.$on('formula:input', text => {
            this.selection.current.text(text)
            this.modifyCellValueInStore(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.selectedCellFocus()
        })
        // subscribe to state
        // this.$subscribe(state => {
        //     console.log('TableState', state)
        // })
    }

    toHTML() {
        return createTable(this.rowsToCreate, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }


    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    modifyCellValueInStore(currentCellValue) {
        this.$dispatch(actions.modCurrentCellData({
            cellId: this.selection.current.getCellId(),
            cellValue: currentCellValue
        }))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
            //console.log('cell params: ', data)
        } catch (e) {
            console.warn('Resize err: ', e.message)
        }
    }

    async onMousedown(event) {
        const {target, shiftKey} = event;
        if (shouldResize(event)) {
            await this.resizeTable(event)
        } else if (isCell(event)) {
            if (shiftKey) {
                const currentCell = this.selection.current.getCellId()
                const targetCell = $(target).data.col

                this.selection.selectGroup(
                    getGroupOfCells(currentCell, targetCell)
                        .map(id => this.$root.find(`[data-col="${id}"]`)))
            } else {
                this.selectCell($(target))
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
            this.selectCell($nextCell)
        }
    }

    // dispatch to store data from current cell to formula input
    onInput(event) {
        //this.$emit('table:input', $(event.target))
        this.modifyCellValueInStore($(event.target).text())
    }
}
