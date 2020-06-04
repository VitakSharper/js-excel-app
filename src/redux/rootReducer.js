import {TableActionTypes} from "@/redux/actionTypes";
import {addColumnToState, addValueToCellsDataState} from "@/redux/utils";

const initialState = {
    columnState: {},
    rowState: {},
    cellsDataState: {},
    currentCellValue: ''
}

export function rootReducer(state = initialState, action) {
    //console.log('in reducer: ', action)
    switch (action.type) {
        case TableActionTypes.TABLE_RESIZE:
            return {
                ...state,
                [action.payload.type + 'State']: addColumnToState(state, action.payload)
            }
        case TableActionTypes.MODIFY_CELL_DATA:
            return {
                ...state,
                currentCellValue: action.payload.cellValue,
                cellsDataState: addValueToCellsDataState(state.cellsDataState, action.payload)
            }
        default:
            return state
    }
}
