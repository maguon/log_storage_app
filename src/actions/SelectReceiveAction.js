import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getReceiveAll = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectReceiveTypes.GET_RECEIVES_WAITING, payload: {} })
    let url = `${base_host}/receive?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.selectReceiveTypes.GET_RECEIVES_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.selectReceiveTypes.GET_RECEIVES_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.selectReceiveTypes.GET_RECEIVES_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
