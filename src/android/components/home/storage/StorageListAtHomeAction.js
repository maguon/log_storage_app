import httpRequest from '../../../../util/HttpRequest'
import { base_host, record_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import moment from 'moment'

export const getStorageList = () => async (dispatch, getState) => {
    try{
        const url = `${base_host}/storageDate?${ObjectToUrl({
            dateStart: moment().format('YYYYMMDD'),
            dateEnd: moment().format('YYYYMMDD')
        })}`
        const res= await  httpRequest.get(url)
        if(res.success){
            dispatch({ type: actionTypes.homeTypes.GET_STORAGES_HOME_SUCCESS, payload: { storageList: res.result } })
        }else{
            dispatch({ type: actionTypes.homeTypes.GET_STORAGES_HOME_FAILED, payload: { failedMsg: res.msg } })
        }
    }catch (err){
        dispatch({ type: actionTypes.homeTypes.GET_STORAGES_HOME_ERROR, payload: { errorMsg: err } })
    }
}

export const getStorageListWaiting = () => (dispatch)=>{
    dispatch({ type: actionTypes.homeTypes.GET_STORAGES_HOME_WAITING, payload: {} })
}