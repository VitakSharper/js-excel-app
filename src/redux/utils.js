export const addColumnToState = (state, payload) => {
    const {type, value} = payload
    return type === 'column'
        ? {...state.columnState, [payload[type]]: value}
        : {...state.rowState, [payload[type]]: value}
}

export const addValueToCellsDataState = (cellsDataState, payload) => {
    const {cellId, cellValue} = payload
    return {...cellsDataState, [cellId]: cellValue}
}

export const applyCssToCell = (stylesState, payload) => {
    const {cellIds, cssDeclaration} = payload;

    const styles = cellIds.forEach(id => {
        stylesState[id] = {...stylesState[id], ...cssDeclaration}
    })
    return {...stylesState, ...styles}
}
