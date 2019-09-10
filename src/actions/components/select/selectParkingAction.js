import httpRequest from '../../../util/HttpRequest'

import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'


export const getParkingList = param => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
        const url = `${base_host}/storageParking?${ObjectToUrl({
            storageId: param.storage.storage_id,
            areaId: param.area.id
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectParkingActionTypes.get_parkingList_success, payload: { parkingList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectParkingActionTypes.get_parkingList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectParkingActionTypes.get_parkingList_error, payload: { errorMsg: err } })
    }
}

export const getParkingListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectParkingActionTypes.get_parkingList_waiting, payload: {} })
}