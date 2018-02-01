import httpRequest from '../../util/HttpRequest'
import { base_host, record_host, file_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'


export const exportCar = param => async (dispatch, getState) => {
    const { LoginReducer: { user: { userId } } } = getState()
    try{
        dispatch({ type: actionTypes.carInfoTypes.put_exportCar_waiting, payload: {} })
        const url = `${base_host}/user/${userId}/carStorageRel/${param.r_id}/relStatus/2?${ObjectToUrl({
            parkingId: param.p_id,
            storageId: param.storage_id,
            carId: param.id
        })}`
        const res=await httpRequest.put(url,{})
        if(res.success){
            dispatch({ type: actionTypes.carInfoTypes.put_exportCar_success, payload: {} })
            ToastAndroid.showWithGravity('出库成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }else{
            dispatch({ type: actionTypes.carInfoTypes.put_exportCar_failed, payload: {failedMsg:res.msg} })
            ToastAndroid.showWithGravity(`出库失败:${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }catch(err){
        dispatch({ type: actionTypes.carInfoTypes.put_exportCar_error, payload: {errorMsg:err} })
        ToastAndroid.showWithGravity(`已全部加载完毕:${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}

export const importCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/carStorageRel?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.IMPORT_CAR_WAITING, payload: {} })
    httpRequest
        .putcallback(url, param.postParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.IMPORT_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carInfoTypes.IMPORT_CAR_SUCCESS, payload: {} })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.IMPORT_CAR_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const updateCarInfo = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}`
    dispatch({ type: actionTypes.carInfoTypes.UPDATE_CARINFO_WAITING, payload: {} })
    httpRequest
        .putcallback(url, param.putParam, (err, res) => {
            if (err) {

                dispatch({ type: actionTypes.carInfoTypes.UPDATE_CARINFO_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carInfoTypes.UPDATE_CARINFO_SUCCESS, payload: { data: param.putParam } })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.UPDATE_CARINFO_FAILED, payload: { data: res.msg } })
                }
            }
        })
}


export const moveCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/storageParking/${param.requiredParam.parkingId}?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.MOVE_CAR_WAITING, payload: {} })
    httpRequest
        .putcallback(url, {}, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.MOVE_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carInfoTypes.MOVE_CAR_SUCCESS, payload: {} })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}






export const delImage = (param) => (dispatch) => {
    let url = `${record_host}/user/${param.requiredParam.userId}/record/${param.requiredParam.recordId}/image/${param.requiredParam.url}`
    dispatch({ type: actionTypes.carInfoTypes.DELETE_IMAGE_WAITING, payload: {} })
    httpRequest
        .delcallback(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.DELETE_IMAGE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carInfoTypes.DELETE_IMAGE_SUCCESS, payload: {} })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.DELETE_IMAGE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}


export const sendCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/carStatus/${param.requiredParam.carStatus}`
    dispatch({ type: actionTypes.carInfoTypes.SEND_CAR_WAITING, payload: {} })
    httpRequest
        .putcallback(url, {}, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.SEND_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carInfoTypes.SEND_CAR_SUCCESS, payload: {} })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.SEND_CAR_FAILED, payload: {} })
                }
            }
        })
}


export const appendImage = (param) => (dispatch) => {
    let url = `${file_host}user/${param.requiredParam.userId}/image?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.APPEND_IMAGE_WAITING, payload: {} })
    httpRequest
        .postFilecallback(url, param.postFileParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.APPEND_IMAGE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    url = `${record_host}/car/${param.requiredParam.carId}/vin/${param.requiredParam.vin}/storageImage`
                    param.postParam.url = res.imageId
                    httpRequest.postcallback(url, param.postParam, (carErr, carRes) => {
                        if (carErr) {
                            dispatch({ type: actionTypes.carInfoTypes.APPEND_IMAGE_ERROR, payload: { data: carErr } })
                        } else {
                            if (carRes.success) {
                                dispatch({
                                    type: actionTypes.carInfoTypes.APPEND_IMAGE_SUCCESS, payload: {
                                        data: `${file_host}image/${res.imageId}`
                                    }
                                })
                            }
                            else {
                                dispatch({ type: actionTypes.carInfoTypes.APPEND_IMAGE_FAILED, payload: { data: carRes.msg } })
                            }
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.APPEND_IMAGE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
