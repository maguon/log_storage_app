import httpRequest from '../../../util/HttpRequest'
import { base_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'


export const getRecordList = () => (dispatch, getState) => {
    const { userReducer: { userId } } = getState()
    const url = `${record_host}/opRecord?${ObjectToUrl({
        start: 0, 
        size: 10,
        userId 
    })}`
    console.log('url',url)
    dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_WAITING, payload: {} })
    httpRequest
        .getcallback(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
