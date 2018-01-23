import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getAreaList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectAreaTypes.GET_AREAS_WAITING, payload: {} })
    let url = `${base_host}/storageArea?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.selectAreaTypes.GET_AREAS_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.selectAreaTypes.GET_AREAS_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.selectAreaTypes.GET_AREAS_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
