import httpRequest from '../../../util/HttpRequest'

import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'


export const getStorageList = (param) =>async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
        const url = `${base_host}/storage?${ObjectToUrl({ storageStatus: 1 })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectStorageActionTypes.get_storageList_success, payload: { storageList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectStorageActionTypes.get_storageList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectStorageActionTypes.get_storageList_error, payload: { errorMsg: err } })
    }
}


export const getStorageListWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectStorageActionTypes.get_storageList_waiting, payload: {} })
}
