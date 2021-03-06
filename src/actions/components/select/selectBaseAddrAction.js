import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getBaseAddrList = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
        const url = `${base_host}/baseAddr?${ObjectToUrl({
            cityId: param.cityId
        })}`
        const res = await httpRequest.get(url)
        if(res.success){
            dispatch({ type: actionTypes.selectBaseAddrActionTypes.get_baseAddrList_success, payload: {baseAddrList:res.result} })
        }else{
            dispatch({ type: actionTypes.selectBaseAddrActionTypes.get_baseAddrList_failed, payload: {failedMsg:res.msg} })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectBaseAddrActionTypes.get_baseAddrList_error, payload: {errorMsg:err} })
    }
}

export const getBaseAddrListWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectBaseAddrActionTypes.get_baseAddrList_waiting, payload: {} })
}
