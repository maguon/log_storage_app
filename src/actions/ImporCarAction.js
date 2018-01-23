import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const importCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/carStorageRel?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.imporCarTypes.IMPORTCAR_WAITING, payload: {} })
    httpRequest
        .put(url, param.putParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.imporCarTypes.IMPORTCAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.imporCarTypes.IMPORTCAR_SUCCESS, payload: {} })
                } else {
                    if (res.code) {
                        dispatch({ type: actionTypes.imporCarTypes.IMPORTCAR_SERVICEERROR, payload: { data: res.message } })
                    } else {
                        dispatch({ type: actionTypes.imporCarTypes.IMPORTCAR_FAILED, payload: { data: res.msg } })
                    }
                    
                }
            }
        })
}

export const resetImportCar = () => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.RESET_IMPORTCAR, payload: {} })
}
