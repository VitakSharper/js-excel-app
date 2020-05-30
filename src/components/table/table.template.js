export const CODES = {
    A: 65,
    Z: 90
}
const firstRow = 0
const colsCount = CODES.Z - CODES.A + 1
const DEFAULT_WIDTH = 120

const toChar = (_, index) => String.fromCharCode(CODES.A + index)

export const createTable = (rowsCount = 16, state = {}) => new Array(rowsCount)
    .fill('')
    .map((_, idx) => creator(_, idx, state))
    .join('')

const getWidthFromState = (state, col, fn) => fn(col, (state.colState[col[0]] || DEFAULT_WIDTH) + 'px')

const creator = (_, rowIdx, state) => rowIdx === firstRow
    ? createRow(columns(colsCount, state), '')
    : createRow(cells(colsCount, rowIdx, state), rowIdx)

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
function createCell(char, width) {
    return `
<div 
class="cell"
style="width: ${width}"
contenteditable 
data-col="${char}"
data-type="cell"
></div>
`
}

function createColumn(col, width) {
    return `
<div class="column" data-type="random-char" data-col="${col}" style="width: ${width}">
${col}
<div class="column__resize" data-resize="column"></div>
</div>
`
}

function createRow(content, rowIdx) {
    const resize = rowIdx ? '<div class="row__resize" data-resize="row"></div>' : ''
    return `
<div class="row" data-type="random-char">
    <div class="row__info">
            ${rowIdx ? rowIdx : ''}
            ${resize}
            </div>
    <div class="row__data">${content}</div>
</div>
`
}
