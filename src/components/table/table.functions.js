import {colsRange, rowsRange} from "@core/utils";

export const shouldResize = (event) => event.target.dataset.resize

export const isCell = (event) => event.target.dataset.type === 'cell'

export const getGroupOfCells = (current, target) => {
    const cols = colsRange(current, target)
    const rows = rowsRange(current, target)

    return !(+current.substring(1) > +target.substring(1))
        ? cols.reduce((acc, el) => {
            rows.forEach((_, idx) => acc.push(`${el[0]}${+el.substring(1) + idx}`))
            return acc
        }, [])
        : cols.reduce((acc, el) => {
            rows.forEach((_, idx) => acc.push(`${el[0]}${+el.substring(1) - idx}`))
            return acc
        }, [])
}

export const nextSelector = (key, currentCell, rowsToCreate, fn) => {
    let transformedCell;
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            transformedCell = `${currentCell[0]}${(+currentCell.substring(1)) + 1}`
            break
        case 'Tab':
        case 'ArrowRight':
            transformedCell = `${String.fromCharCode(currentCell.charCodeAt(0) + 1)}${currentCell.substring(1)}`
            break
        case 'ArrowLeft':
            transformedCell = `${String.fromCharCode(currentCell.charCodeAt(0) - 1)}${currentCell.substring(1)}`
            break
        case 'ArrowUp':
            transformedCell = `${currentCell[0]}${(+currentCell.substring(1)) - 1}`
            break
    }
    return fn(transformedCell, currentCell, rowsToCreate)
}
