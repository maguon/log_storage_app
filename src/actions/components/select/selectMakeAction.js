import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'

export const getMakeList = () => async (dispatch) => {
    try {
        const url = `${base_host}/carMake`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectMakeActionTypes.get_makeList_success, payload: { makeList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectMakeActionTypes.get_makeList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectMakeActionTypes.get_makeList_error, payload: { errorMsg: err } })
    }
}

export const getMakeListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectMakeActionTypes.get_makeList_waiting, payload: {} })
}