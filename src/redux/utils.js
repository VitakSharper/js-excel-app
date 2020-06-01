export const addColumnToState = (state, payload) => {
    const {type, value} = payload
    return type === 'column'
        ? {...state.columnState, [payload[type]]: value}
        : {...state.rowState, [payload[type]]: value}
}

export const addValueToCellsDataState = (cellsDataState, payload) => {
    const {cellId, cellValue} = payload
    return {...cellsDataState, [cellId] : cellValue}
}
