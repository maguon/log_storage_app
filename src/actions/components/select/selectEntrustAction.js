import httpRequest from '../../../util/HttpRequest'

import * as actionTypes from '../../../actionTypes'

export const getEntrustList = () => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
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
