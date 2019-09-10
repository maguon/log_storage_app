import httpRequest from '../../../util/HttpRequest'

import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getTruckList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
        const url = `${base_host}/truckFirst?${ObjectToUrl({truckType:1})}`
        const res =await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectTruckActionTypes.get_truckList_success, payload: { truckList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectTruckActionTypes.get_truckList_failed, payload: { failedMsg: res.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.selectTruckActionTypes.get_truckList_error, payload: { errorMsg: err } })
    }
}

export const getTruckListWaiting = () => async (dispatch) => {
    dispatch({ type: actionTypes.selectTruckActionTypes.get_truckList_waiting, payload: {} })
}

