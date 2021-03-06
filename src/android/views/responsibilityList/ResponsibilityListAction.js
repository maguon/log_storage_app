import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../../../util/util'

const pageSize = 50

export const getResponsibilityList = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = getState()
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        const url = `${base_host}/damage?${ObjectToUrl({ underUserId: uid, start: 0, size: pageSize })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.responsibilityListTypes.get_ResponsibilityList_success,
                payload: {
                    responsibilityList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.responsibilityListTypes.get_ResponsibilityList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.responsibilityListTypes.get_ResponsibilityList_error, payload: { errorMsg: err } })
    }
}

export const getResponsibilityListWaiting = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.responsibilityListTypes.get_ResponsibilityList_waiting, payload: {} })
}

export const getResponsibilityListMore = () => async (dispatch, getState) => {
    const {
        loginReducer: { data: { user: { uid } } },
        responsibilityListReducer: { data: { responsibilityList, isComplete } },
        responsibilityListReducer } = getState()
    const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = getState()
    if (responsibilityListReducer.getResponsibilityListMore.isResultStatus == 1) {
        await sleep(1000)
        getResponsibilityListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.responsibilityListTypes.get_ResponsibilityListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/damage?${ObjectToUrl({ underUserId: uid, start: responsibilityList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.responsibilityListTypes.get_ResponsibilityListMore_success, payload: { responsibilityList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.responsibilityListTypes.get_ResponsibilityListMore_success, payload: { responsibilityList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.responsibilityListTypes.get_ResponsibilityListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.responsibilityListTypes.get_ResponsibilityListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }

}