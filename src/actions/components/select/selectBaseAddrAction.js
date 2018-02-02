import httpRequest from '../../../util/HttpRequest'
import { base_host, record_host, file_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getBaseAddrList = (param) => async (dispatch, getState) => {
    try {
        const url = `${base_host}/baseAddr?${ObjectToUrl({
            cityId: param.cityId
        })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
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
