import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { Alert } from 'react-native'

const pageSize = 10

export const getRecordList = (param) => async (dispatch, getState) => {
    try {
        // console.log('getState', getState())
        dispatch({ type: actionTypes.recordListTypes.get_recordList_waiting })
        const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${record_host}/opRecord?${ObjectToUrl({
            ...param,
            userId: uid,
            start: 0,
            size: pageSize
        })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            dispatch({
                type: actionTypes.recordListTypes.get_recordList_success, payload: {
                    recordList: res.result,
                    searchParam: param,
                    isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                }
            })
            // console.log('success',success)

        } else {
            dispatch({ type: actionTypes.recordListTypes.get_recordList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.recordListTypes.get_recordList_error, payload: { errorMsg: `${err}` } })
    }
}


export const getRecordListMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = getState()
    const { RecordListReducer: { data: { searchParam, recordList, isComplete } }, RecordListReducer } = getState()
    const { loginReducer: { data: { user: { uid } } } } = getState()
    if (RecordListReducer.getRecordListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getRecordListMore())
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.recordListTypes.get_recordListMore_waiting })
            try {
                const url = `${record_host}/opRecord?${ObjectToUrl({
                    ...searchParam,
                    userId: uid,
                    start: recordList.length,
                    size: pageSize
                })}`
                console.log('url',url)
                const res = await httpRequest.get(url)
                // console.log('res',res)

                if (res.success) {
                    dispatch({
                        type: actionTypes.recordListTypes.get_recordListMore_success, payload: {
                            recordList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.recordListTypes.get_recordListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.recordListTypes.get_recordListMore_error, payload: { errorMsg: `${err}` } })
            }
        } else {

        }
    }
}

// export const getRecordList = (param) => (dispatch, getState) => {
//     const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = getState()
//     dispatch({ type: actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_WAITING, payload: {} })
//     let url = `${record_host}/opRecord?${ObjectToUrl(param.optionalParam)}`
//     console.log('url', url)
//     httpRequest
//         .getcallback(url, (err, res) => {
//             if (err) {
//                 dispatch({ type: actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_ERROR, payload: { data: err } })
//             }
//             else {
//                 if (res.success) {
//                     dispatch({ type: actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_SUCCESS, payload: { data: res.result } })
//                 }
//                 else {
//                     dispatch({ type: actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_FAILED, payload: { data: res.msg } })
//                 }
//             }
//         })
// }

// export const getRecordListMore = (param) => (dispatch, getState) => {
//     dispatch({ type: actionTypes.recordListTypes.GET_RECORDLIST_MORE_WAITING, payload: {} })
//     const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = getState()
//     let url = `${record_host}/opRecord?${ObjectToUrl(param.optionalParam)}`
//     httpRequest
//         .getcallback(url, (err, res) => {
//             if (err) {
//                 dispatch({ type: actionTypes.recordListTypes.GET_RECORDLIST_MORE_ERROR, payload: { data: err } })
//             }
//             else {
//                 if (res.success) {
//                     dispatch({ type: actionTypes.recordListTypes.GET_RECORDLIST_MORE_SUCCESS, payload: { data: res.result } })
//                 }
//                 else {
//                     dispatch({ type: actionTypes.recordListTypes.GET_RECORDLIST_MORE_FAILED, payload: { data: res.msg } })
//                 }
//             }
//         })
// }

// export const changeRecordListTab = (param) => (dispatch) => {

//     dispatch({ type: actionTypes.recordListTypes.CHANGE_RECORD_LIST_TAB, payload: { data: param } })
// }