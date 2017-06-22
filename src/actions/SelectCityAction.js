import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'

export const getCityAll = () => (dispatch) => {
    dispatch({ type: actionTypes.selectCityTypes.GET_CITYS_WAITING, payload: {} })
    let url = `${base_host}/city`
    httpRequest
        .get(url, (err, res) => {
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
