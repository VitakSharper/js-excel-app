const CODES = {
    A: 65,
    Z: 90
}
const firstRow = 0
const colsCount = CODES.Z - CODES.A + 1

const toChar = (_, index) => String.fromCharCode(CODES.A + index)

export const createTable = (rowsCount = 16) =>
    new Array(rowsCount)
        .fill('')
        .map(creator)
        .join('')

const creator = (_, rowIdx) => rowIdx === firstRow
    ? createRow(columns(colsCount), '')
    : createRow(cells(colsCount, rowIdx), rowIdx)

const columns = (colsCount) => new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createColumn)
    .join('')

const cells = (colsCount, rowIdx) => new Array(colsCount)
    .fill('')
    // .map((el, cellIdx) => createCell(toChar(el, cellIdx), rowIdx))
    .map(createCell)
    .join('')


// function createCell(char, rowIdx) {
//     return `
// <div class="cell" contenteditable>${char} ${rowIdx}</div>
// `
// }
function createCell() {
    return `
<div class="cell" contenteditable></div>
`
}

function createColumn(content) {
    return `
<div class="column">
${content}
</div>
`
}

function createRow(content, rowIdx) {
    return `
<div class="row">
    <div class="row__info">${rowIdx}</div>
    <div class="row__data">${content}</div>
</div>
`
}
