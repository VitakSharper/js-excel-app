import {CODES} from "@/components/table/table.template";

export const formatListenerName = (eventName) => {
    return 'on' + capitalize(eventName)
}

function capitalize(string) {
    if (typeof string !== 'string')
        return ''
    return string[0].toUpperCase() + string.substring(1)
    //return string.charAt(0).toUpperCase()+string.slice(1)
}

export const rowsRange = (current, target) => (+current.substring(1) > +target.substring(1))
    ? new Array(Math.abs((target.substring(1) - current.substring(1)) - 1))
        .fill('')
    : new Array((target.substring(1) - current.substring(1)) + 1)
        .fill('')

export const colsRange = (firstCol, lastCol) => populate(...colsPredicate(firstCol, lastCol))

const populate = (firstCol, lastCol, isInvert) =>
    new Array((lastCol.charCodeAt(0) - firstCol.charCodeAt(0)) + 1)
        .fill('')
        .map((_, idx) =>
            String.fromCharCode((firstCol.charCodeAt(0) + idx)) +
            (!isInvert.isInvert ? firstCol.substring(1) : lastCol.substring(1)))

const colsPredicate = (firstCol, lastCol) =>
    firstCol.charCodeAt(0) > lastCol.charCodeAt(0)
        ? [lastCol, firstCol, {isInvert: true}]
        : [firstCol, lastCol, {isInvert: false}]

export const checkCellRange = (transformedCell, currentCell, rowsToCreate) => {
    return ((transformedCell.charCodeAt(0) >= CODES.A) && (transformedCell.charCodeAt(0) <= CODES.Z))
    && (+transformedCell.substring(1) >= 1) && (+transformedCell.substring(1) <= rowsToCreate)
        ? `[data-col="${transformedCell}"]`
        : `[data-col="${currentCell}"]`
}

export const storage = (key, data = null) => !data
    ? JSON.parse(localStorage.getItem(key))
    : localStorage.setItem(key, JSON.stringify(data))

// js hack comparing two objects or two strings , not a deep compare
export const isEqual = (a, b) => (typeof a === 'object') && (typeof b === 'object')
    ? JSON.stringify(a) === JSON.stringify(b)
    : a === b

export const camelCaseToDash = (cssProperty) =>
    cssProperty.replace(/([A-Z])/g, (g) =>
        `-${g[0].toLowerCase()}`)

export const toInlineStyles = (styles = {}) =>
    Object.keys(styles)
        .map(cssDeclaration =>
            `${camelCaseToDash(cssDeclaration)}:${styles[cssDeclaration]}`)
        .join(';')
