import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'

export const getEntrustList = () => async (dispatch) => {
    try {
        const url = `${base_host}/entrust`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectEntrustActionTypes.get_entrustList_success, payload: { entrustList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectEntrustActionTypes.get_entrustList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectEntrustActionTypes.get_entrustList_error, payload: { errorMsg: err } })
    }
}

export const getEntrustListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectEntrustActionTypes.get_entrustList_waiting, payload: {} })
}
