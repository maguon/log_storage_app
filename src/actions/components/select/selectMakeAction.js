import httpRequest from '../../../util/HttpRequest'

import * as actionTypes from '../../../actionTypes'

export const getMakeList = () => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
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