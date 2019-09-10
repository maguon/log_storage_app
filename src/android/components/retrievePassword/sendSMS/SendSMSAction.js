import httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actionTypes/index'
import { sleep } from '../../../../util/util'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'

export const countDown = () => async (dispatch, getState) => {
    const { sendSMSReducer: { data: { countDownTime } } } = getState()
    const sendSMSFormValues = getFormValues('sendSMSForm')(getState())
    const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
    if (sendSMSFormValues && sendSMSFormValues.mobile) {
        try {
            if (countDownTime > 0) {
                dispatch({ type: actionTypes.sendSMSActionTypes.sendSMS_waiting, payload: { countDownTime: countDownTime - 1 } })
                await sleep(1000)
                dispatch(countDown())
            } else {
                dispatch({ type: actionTypes.sendSMSActionTypes.sendSMS_waiting, payload: { countDownTime: 60 } })
            }
        } catch (err) {
            ToastAndroid.showWithGravity(`倒计时错误！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}

export const getVCode = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.sendSMSActionTypes.get_VCode_waiting, payload: {} })
    const sendSMSFormValues = getFormValues('sendSMSForm')(getState())
    const { communicationSettingReducer: { data: { base_host,record_host,file_host } } } = getState()
    if (sendSMSFormValues && sendSMSFormValues.mobile) {
        try {

            const url = `${base_host}/phone/${sendSMSFormValues.mobile}/passwordSms`
            const res = await httpRequest.post(url, {})
            if (res.success) {
                dispatch({ type: actionTypes.sendSMSActionTypes.get_VCode_success, payload: {} })
                ToastAndroid.showWithGravity(`短信已发送！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            } else {
                dispatch({ type: actionTypes.sendSMSActionTypes.get_VCode_failed, payload: { failedMsg: res.msg } })
                ToastAndroid.showWithGravity(`短信发送失败：${res.msg}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            }
        } catch (err) {
            dispatch({ type: actionTypes.sendSMSActionTypes.get_VCode_error, payload: { errorMsg: err } })
            ToastAndroid.showWithGravity(`短信发送失败：${err}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } else {
        ToastAndroid.showWithGravity(`短信发送失败：电话号码不能为空！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }

}