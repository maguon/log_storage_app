import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'

export const getEntrustAll = () => (dispatch) => {
    dispatch({ type: actionTypes.selectEntrustTypes.GET_ENTRUSTS_WAITING, payload: {} })
    let url = `${base_host}/entrust`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.selectEntrustTypes.GET_ENTRUSTS_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.selectEntrustTypes.GET_ENTRUSTS_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.selectEntrustTypes.GET_ENTRUSTS_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
