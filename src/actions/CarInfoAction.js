import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarInformation = (param) => (dispatch) => {
    let urls = [`${record_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/record`,
    `${base_host}/car?${ObjectToUrl(param.carOptionalParam)}`,
    `${base_host}/carList?${ObjectToUrl(param.carListOptionalParam)}`]
    dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_WAITING, payload: {} })
    httpRequest
        .getAll(urls, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_ERROR, payload: { data: err } })
            } else {
                if (res[0].success && res[1].success && res[2].success) {
                    dispatch({
                        type: actionTypes.carInfoTypes.GET_CARINFO_SUCCESS, payload: {
                            data: {
                                recordList: res[0].result[0].comment,
                                imageList: res[0].result[0].storage_image.map(item => {
                                    return `${file_host}image/${item.url}`
                                }),
                                recordId: res[0].result[0]._id,
                                car: res[1].result.length > 0 ? res[1].result.shift() : res[2].result.shift()
                            }
                        }
                    })
                } else {
                    if (res[0].code || res[1].code || res[2].code) {
                        dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_SERVICEERROR, payload: { data: `${res[0].message}&&${res[1].message}&&${res[2].message}` } })
                    } else {
                        dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_FAILED, payload: { data: `${res[0].msg}&&${res[1].msg}&&${res[2].msg}` } })
                    }
                }
            }
        })
}

export const carInfoInit = (param) => (dispatch) => {
    let url = `${record_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/record`
    dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_WAITING, payload: {} })
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({
                        type: actionTypes.carInfoTypes.GET_CARINFO_SUCCESS, payload: {
                            data: {
                                recordList: res.result[0].comment,
                                imageList: res.result[0].storage_image.map(item => {
                                    return `${file_host}image/${item.url}`
                                }),
                                recordId: res.result[0]._id,
                                car: param.car
                            }
                        }
                    })
                } else {
                    if (res.code) {
                        dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_SERVICEERROR, payload: { data: res.message } })
                    } else {
                        dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_FAILED, payload: { data: res.msg } })
                    }
                }
            }
        })
}

export const resetGetCarInfo = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_GET_CARINFO, payload: {} })
}

export const updateCarInfo = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}`
    dispatch({ type: actionTypes.carInfoTypes.UPDATE_CARINFO_WAITING, payload: {} })
    httpRequest
        .put(url, param.putParam, (err, res) => {
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

export const resetUpdateCarInfo = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_UPDATE_CARINFO, payload: {} })
}

export const importCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/carStorageRel?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.IMPORT_CAR_WAITING, payload: {} })
    httpRequest
        .put(url, param.postParam, (err, res) => {
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

export const resetImportCar = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_IMPORT_CAR, payload: {} })
}

export const moveCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/storageParking/${param.requiredParam.parkingId}?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.MOVE_CAR_WAITING, payload: {} })
    httpRequest
        .put(url, {}, (err, res) => {
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

export const resetMoveCar = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_MOVE_CAR, payload: {} })
}

export const exportCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/carStorageRel/${param.requiredParam.relId}/relStatus/${param.requiredParam.relStatus}?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_WAITING, payload: {} })
    httpRequest
        .put(url, {}, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {

                    dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_SUCCESS, payload: {} })
                } else {

                    dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const resetExportCar = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_EXPORT_CAR, payload: {} })
}

export const appendImage = (param) => (dispatch) => {
    let url = `${file_host}user/${param.requiredParam.userId}/image?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.APPEND_IMAGE_WAITING, payload: {} })
    httpRequest
        .postFile(url, param.postFileParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.APPEND_IMAGE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    url = `${record_host}/car/${param.requiredParam.carId}/vin/${param.requiredParam.vin}/storageImage`
                    param.postParam.url = res.imageId
                    httpRequest.post(url, param.postParam, (carErr, carRes) => {
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

export const resetAppendImage = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_APPEND_IMAGE, payload: {} })
}

export const delImage = (param) => (dispatch) => {
    let url = `${record_host}/user/${param.requiredParam.userId}/record/${param.requiredParam.recordId}/image/${param.requiredParam.url}`
    dispatch({ type: actionTypes.carInfoTypes.DELETE_IMAGE_WAITING, payload: {} })
    httpRequest
        .del(url, (err, res) => {
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

export const resetDelImage = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_DELETE_IMAGE, payload: {} })
}

