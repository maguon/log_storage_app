import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const searchVinList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.searchVinTypes.SEARCH_VINLIST_WAITING, payload: {} })
    let url = `${base_host}/car?${ObjectToUrl(param.optionalParam)}`
    console.log(url)
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.searchVinTypes.SEARCH_VINLIST_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.searchVinTypes.SEARCH_VINLIST_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.searchVinTypes.SEARCH_VINLIST_FAILED, payload: { data: res.msg } })
                }
            }

        })
}

export const resetSearchCarList = () => (dispatch) => {
    dispatch({ type: actionTypes.searchVinTypes.RESET_SEARCH_VINLIST, payload: {} })
}