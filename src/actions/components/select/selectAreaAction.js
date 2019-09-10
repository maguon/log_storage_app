import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getAreaList = (param) => async (dispatch,getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
        const url = `${base_host}/storageArea?${ObjectToUrl({
            areaStatus: 1,
            storageId: param.id
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.selectAreaActionTypes.get_areaList_success, payload: { areaList: res.result } })
        } else {
            dispatch({ type: actionTypes.selectAreaActionTypes.get_areaList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectAreaActionTypes.get_areaList_error, payload: { errorMsg: err } })
    }
}


export const getAreaListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectAreaActionTypes.get_areaList_waiting, payload: {} })
}
