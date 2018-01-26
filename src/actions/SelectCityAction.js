import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'

export const getCityAll = () => (dispatch) => {
    
    let url = `${base_host}/city`
    httpRequest
        .getcallback(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.selectCityTypes.GET_CITYS_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.selectCityTypes.GET_CITYS_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.selectCityTypes.GET_CITYS_FAILED, payload: { data: res.msg } })
                }
            }
        })
}


export const getCityAllWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCityTypes.GET_CITYS_WAITING, payload: {} })
}
