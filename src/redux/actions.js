import {TableActionTypes} from "@/redux/actionTypes";

export const tableResize = (data) => ({
    type: TableActionTypes.TABLE_RESIZE,
    payload: data
})

export const modCurrentCellData = (data) => ({
    type: TableActionTypes.MODIFY_CELL_DATA,
    payload: data
})

export const changeStyles = (data) => ({
    type: TableActionTypes.CHANGE_STYLE,
    payload: data
})

export const applyStyle = (data) => ({
    type: TableActionTypes.APPLY_STYLE,
    payload: data
})
