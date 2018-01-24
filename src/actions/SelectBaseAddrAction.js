import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getBaseAddrAll = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectBaseAddrTypes.GET_BASEADDRS_WAITING, payload: {} })
    let url = `${base_host}/baseAddr?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .getcallback(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.selectBaseAddrTypes.GET_BASEADDRS_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.selectBaseAddrTypes.GET_BASEADDRS_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.selectBaseAddrTypes.GET_BASEADDRS_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
