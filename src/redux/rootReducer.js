import {TableActionTypes} from "@/redux/actionTypes";
import {addColumnToState, addValueToCellsDataState, applyCssToCell} from "@/redux/utils";
import {defaultStyles, defaultTitle} from "@/constants";
import {Table} from "@/components/table/Table";

const initialState = {
    tableTitle: defaultTitle,
    columnState: {},
    rowState: {},
    cellsDataState: {},
    stylesState: {},
    currentCellValue: '',
    currentStyles: defaultStyles
}

// const normalize = state => ({...state, currentStyles: defaultStyles, currentCellValue: ''})
//
// const initialState = storage('excel-state')
//     ? normalize(storage('excel-state'))
//     : defaultState

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
        case TableActionTypes.CHANGE_STYLE:
            return {...state, currentStyles: action.payload}
        case TableActionTypes.APPLY_STYLE:
            return {
                ...state,
                stylesState: applyCssToCell(state.stylesState || {}, action.payload),
                currentStyles: {...state.currentStyles, ...action.payload.cssDeclaration}
            }
        case TableActionTypes.TITLE_MODIFY:
            return {
                ...state, tableTitle: action.payload
            }
        default:
            return state
    }
}
