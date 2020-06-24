import {defaultStyles} from "@/constants";
import {camelCaseToDash, toInlineStyles} from "@core/utils";
import {parse} from "@core/parse";

export const CODES = {
    A: 65,
    Z: 90
}
const firstRow = 0
const colsCount = CODES.Z - CODES.A + 1
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const toChar = (_, index) => String.fromCharCode(CODES.A + index)

export const createTable = (rowsCount = 16, state = {}) => {
    return new Array(rowsCount)
        .fill('')
        .map((_, idx) => creator(_, idx, state))
        .join('')
}

const getWidthFromState = (state, col, fn) => fn(col, state)
const getHeightFromState = (rowState, rowIdx) => (rowState && rowState[rowIdx] || DEFAULT_HEIGHT) + 'px'

const creator = (_, rowIdx, state) => rowIdx === firstRow
    // create first row unsizable
    ? createRow(columns(colsCount, state), '')
    : createRow(cells(colsCount, rowIdx, state), rowIdx, getHeightFromState(state.rowState, rowIdx))

const columns = (colsCount, state) => new Array(colsCount)
    .fill('')
    .map(toChar)
    .map((col) =>
        getWidthFromState(state, col, createColumn))
    .join('')

const cells = (colsCount, rowIdx, state) => new Array(colsCount)
    .fill('')
    .map((el, cellIdx) =>
        getWidthFromState(state, (toChar(el, cellIdx) + rowIdx), createCell))
    // .map(createCell)
    .join('')

// function createCell(char, rowIdx) {
//     return `
// <div class="cell" contenteditable>${char} ${rowIdx}</div>
// `
// }
function createCell(cellId, state) {
    const width = (state.columnState && state.columnState[cellId[0]] || DEFAULT_WIDTH) + 'px'
    const value = state.cellsDataState && state.cellsDataState[cellId] || ''
    // transform styles from object and camelCase to dash style css declaration format with ; in the end
    const styles = (state.stylesState
        && state.stylesState[cellId]
        && toInlineStyles({...defaultStyles, ...state.stylesState[cellId]}))
        || toInlineStyles(defaultStyles)
    return `
<div 
class="cell"
style="${styles}; width: ${width}"
contenteditable 
data-col="${cellId}"
data-type="cell"
data-value="${value}"
>${parse(value)}</div>
`
}

function createColumn(col, state) {
    const width = (state.columnState && state.columnState[col[0]] || DEFAULT_WIDTH) + 'px'
    return `
<div class="column" data-type="resizable" data-col="${col}" style="width: ${width}">
${col}
<div class="column__resize" data-resize="column"></div>
</div>
`
}

function createRow(content, rowIdx, height) {
    const resize = rowIdx ? '<div class="row__resize" data-resize="row"></div>' : ''
    return `
<div class="row" data-type="resizable" data-row="${rowIdx}" style="height: ${height}">
    <div class="row__info">
            ${rowIdx ? rowIdx : ''}
            ${resize}
            </div>
    <div class="row__data">${content}</div>
</div>
`
}
