import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getVinList = (param, timeStamp, vin, pageSize) => (dispatch) => {
    dispatch({ type: actionTypes.searchVinTypes.GET_VINLIST_WAITING, payload: {} })
    let url = `${base_host}/carList?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.searchVinTypes.GET_VINLIST_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.searchVinTypes.GET_VINLIST_SUCCESS, payload: { data: res.result, timeStamp, vin, pageSize } })
                } else {
                    dispatch({ type: actionTypes.searchVinTypes.GET_VINLIST_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const search = (param, vin) => (dispatch) => {
    dispatch({ type: actionTypes.searchVinTypes.SEARCH_CAR_WAITING, payload: {} })
    let url = `${base_host}/car?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.searchVinTypes.SEARCH_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    //let data = (res.result.length > 0) ? res.result.shift() : {}
                    dispatch({ type: actionTypes.searchVinTypes.SEARCH_CAR_SUCCESS, payload: { data: res.result.shift() } })
                } else {
                    dispatch({ type: actionTypes.searchVinTypes.SEARCH_CAR_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const resetGetVinList = (timeStamp) => (dispatch) => {
    dispatch({ type: actionTypes.searchVinTypes.RESET_GET_VINLIST, payload: { timeStamp } })
}

export const resetGetVinListStatus = (timeStamp) => (dispatch) => {
    dispatch({ type: actionTypes.searchVinTypes.RESET_GET_VINLIST_STATUS, payload: {} })
}

export const resetSearch = () => (dispatch) => {
    dispatch({ type: actionTypes.searchVinTypes.RESET_SEARCH_CAR, payload: {} })
}

