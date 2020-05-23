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
    .map((el, cellIdx) => createCell(toChar(el, cellIdx), rowIdx))
    // .map(createCell)
    .join('')


// function createCell(char, rowIdx) {
//     return `
// <div class="cell" contenteditable>${char} ${rowIdx}</div>
// `
// }
function createCell(char, rowIdx) {
    return `
<div class="cell" contenteditable data-col="${char}${rowIdx}"></div>
`
}

function createColumn(content) {
    return `
<div class="column" data-type="random-char" data-col="${content}">
${content}
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
