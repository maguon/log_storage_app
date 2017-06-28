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
                    dispatch({ type: actionTypes.addCarTypes.ADD_CAR_SUCCESS, payload: { data: res.id } })
                } else {
                    dispatch({ type: actionTypes.addCarTypes.ADD_CAR_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const changeAddCarField = (param) => (dispatch) => {
    dispatch({ type: actionTypes.addCarTypes.CHANGE_ADD_CAR_FIELD, payload: { data: param } })
}


export const resetAddCarStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.addCarTypes.RESET_ADD_CAR_STATUS, payload: {} })
}

