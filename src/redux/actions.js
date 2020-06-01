import {TableActionTypes} from "@/redux/actionTypes";

export const tableResize = (data) => ({
    type: TableActionTypes.TABLE_RESIZE,
    payload: data
})

export const modCurrentCellData = (data) => ({
    type: TableActionTypes.MODIFY_CELL_DATA,
    payload: data
})
