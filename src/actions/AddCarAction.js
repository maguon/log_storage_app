import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const addCar = (param) => (dispatch) => {
    // let urls = [`${record_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/record`,
    // `${base_host}/car?${ObjectToUrl(param.optionalParam)}`]
    // dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_WAITING, payload: {} })
    // httpRequest
    //     .getAll(urls, (err, res) => {
    //         if (err) {
    //             dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_ERROR, payload: { data: err } })
    //         } else {
    //             if (res[0].success && res[1].success) {
    //                 dispatch({
    //                     type: actionTypes.carInfoTypes.GET_CARINFO_SUCCESS, payload: {
    //                         data: {
    //                             recordList: res[0].result[0].comment,
    //                             imageList: res[0].result[0].storage_image.map(item => {
    //                                 return `${file_host}image/${item.url}`
    //                             }),
    //                             recordId: res[0].result[0]._id,
    //                             car: res[1].result[0]
    //                         }
    //                     }
    //                 })
    //             } else {
    //                 dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_FAILED, payload: { data: `${res[0].msg}&&${res[1].msg}` } })
    //             }
    //         }
    //     })
}

export const changeAddCarField = (param) => (dispatch) => {
    dispatch({ type: actionTypes.addCarTypes.CHANGE_ADD_CAR_FIELD, payload: { data: param } })
}



// export const ADD_CAR_SUCCESS = 'GET_CARINFO_SUCCESS'
// export const ADD_CAR_FAILED = 'GET_CARINFO_FAILED'
// export const ADD_CAR_WAITING = 'GET_CARINFO_WAITING'
// export const ADD_CAR_SERVICEERROR = 'ADD_CAR_SERVICEERROR'
// export const ADD_CAR_ERROR = 'GET_CARINFO_ERROR'
// export const RESET_ADD_CAR = 'RESET_ADD_CAR'
// export const RESET_ADD_CAR_STATUS = 'RESET_ADD_CAR_STATUS'
