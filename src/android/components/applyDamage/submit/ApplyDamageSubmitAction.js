import * as httpRequest from '../../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../../config/Host'
import * as applyDamageSubmitActionTypes from './ApplyDamageSubmitActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { ToastAndroid, InteractionManager } from 'react-native'
//import * as carInfoRecordAction from '../../carInfo/carInfoRecord/CarInfoRecordAction'
import * as routerDirection from '../../../../util/RouterDirection'

export const createDamage = (parent) => async (dispatch, getState) => {
    //console.log('createDamage')
    dispatch({ type: applyDamageSubmitActionTypes.create_Damage_waiting, payload: {} })
    const state = getState()
    const { loginReducer: { data: { user } },
        carDetailReducer: { data: { carDetail } } } = state
    const applyDamageForm = getFormValues('applyDamage')(state) ? getFormValues('applyDamage')(state) : {}
    try {
        const url = `${base_host}/user/${user.uid}/damage`
        const res = await httpRequest.post(url, {
            carId: carDetail.id,
            vin: carDetail.vin,
            truckId: applyDamageForm.selectDriver.truck_id,
            truckNum: applyDamageForm.selectDriver.truck_num,
            driveId: applyDamageForm.selectDriver.id,
            driveName: applyDamageForm.selectDriver.drive_name,
            damageExplain: applyDamageForm.damageRemark
        })
        if (res.success) {
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: applyDamageSubmitActionTypes.create_Damage_success, payload: { damageId: res.id } })
            routerDirection.applyDamageUploadImage(parent)()
            //carInfoRecordAction.getCarInfoRecordWaiting()(dispatch)
            //InteractionManager.runAfterInteractions(() => carInfoRecordAction.getCarInfoRecord({ car_id: carDetail.id })(dispatch, getState))
        } else {
            ToastAndroid.showWithGravity(`提交失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: applyDamageSubmitActionTypes.create_Damage_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: applyDamageSubmitActionTypes.create_Damage_error, payload: { errorMsg: err } })
    }
}