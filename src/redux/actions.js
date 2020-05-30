import {TableActionTypes} from "@/redux/actionTypes";

export const tableResize = (data) => ({
    type: TableActionTypes.TABLE_RESIZE,
    payload: data
})
