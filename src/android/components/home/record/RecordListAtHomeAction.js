import httpRequest from '../../../../util/HttpRequest'
import { base_host, record_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'


export const getRecordList = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } =  getState()
        const url = `${record_host}/opRecord?${ObjectToUrl({
            start: 0,
            size: 10,
            userId: uid
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_SUCCESS, payload: { recordList: res.result } })
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_FAILED, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_ERROR, payload: { errorMsg: err } })
    }
}


export const getRecordListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_WAITING, payload: {} })
}
