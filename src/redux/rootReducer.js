import {TableActionTypes} from "@/redux/actionTypes";
import {addColumnToState, addValueToCellsDataState, applyCssToCell} from "@/redux/utils";
import {defaultStyles} from "@/constants";
import {toInlineStyles} from "@core/utils";

const initialState = {
    columnState: {},
    rowState: {},
    cellsDataState: {},
    stylesState: {},
    currentCellValue: '',
    currentStyles: defaultStyles
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
        case TableActionTypes.CHANGE_STYLE:
            return {...state, currentStyles: action.payload}
        case TableActionTypes.APPLY_STYLE:
            console.log('in reducer: ', action.payload, state.stylesState)
            return {
                ...state,
                stylesState: applyCssToCell(state.stylesState || {}, action.payload),
                currentStyles: {...state.currentStyles, ...action.payload.cssDeclaration}
            }
        default:
            return state
    }
}
