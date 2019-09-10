import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { Alert } from 'react-native'

export const getRecordList = (param) => (dispatch,getState) => {
    const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
    dispatch({ type: actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_WAITING, payload: {} })
    let url = `${record_host}/opRecord?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .getcallback(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_ERROR, payload: { data: err } })
            }
            else {
                if (res.success) {
                    dispatch({ type: actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_SUCCESS, payload: { data: res.result } })
                }
                else {
                    dispatch({ type: actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const getRecordListMore = (param) => (dispatch,getState) => {
    dispatch({ type: actionTypes.recordListTypes.GET_RECORDLIST_MORE_WAITING, payload: {} })
    const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
    let url = `${record_host}/opRecord?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .getcallback(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.recordListTypes.GET_RECORDLIST_MORE_ERROR, payload: { data: err } })
            }
            else {
                if (res.success) {
                    dispatch({ type: actionTypes.recordListTypes.GET_RECORDLIST_MORE_SUCCESS, payload: { data: res.result } })
                }
                else {
                    dispatch({ type: actionTypes.recordListTypes.GET_RECORDLIST_MORE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const changeRecordListTab = (param) => (dispatch) => {

    dispatch({ type: actionTypes.recordListTypes.CHANGE_RECORD_LIST_TAB, payload: { data: param } })
}