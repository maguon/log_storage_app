import * as actionTypes from '../../../../actionTypes/index'
import httpRequest from '../../../../util/HttpRequest'
import { base_host } from '../../../../config/Host'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getStorageList = (param) => async (dispatch) => {
    try {
        const url = `${base_host}/storageDate?${ObjectToUrl(param.optionalParam)}`
        const res = await httpRequest.get(url)      
        if (res.success) {
            dispatch({ type: actionTypes.storageListTypes.get_storageList_success, payload: { storageList: res.result } })
        } else {
            dispatch({ type: actionTypes.storageListTypes.get_storageList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.storageListTypes.get_storageList_error, payload: { errorMsg: err } })
    }
}

export const getStorageListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.storageListTypes.get_storageList_waiting, payload: {} })
}
