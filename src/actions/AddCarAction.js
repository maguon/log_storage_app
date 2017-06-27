import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const addCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/car`
    dispatch({ type: actionTypes.addCarTypes.ADD_CAR_WAITING, payload: {} })
    httpRequest
        .post(url, param.postParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.addCarTypes.ADD_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.addCarTypes.ADD_CAR_SUCCESS, payload: {} })
                } else {
                    dispatch({ type: actionTypes.addCarTypes.ADD_CAR_FAILED, payload: { data: res.msg } })
                }
            }
        })
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
