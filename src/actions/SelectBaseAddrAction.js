import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'

export const getBaseAddrAll = () => (dispatch) => {
    dispatch({ type: actionTypes.selectBaseAddrTypes.GET_BASEADDRS_WAITING, payload: {} })
    let url = `${base_host}/baseAddr`
    httpRequest
        .get(url, (err, res) => {
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
