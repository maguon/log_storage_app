import httpRequest from '../../util/HttpRequest'
import { base_host, record_host, file_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { objectExceptNull } from '../../util/util'
import { ToastAndroid, InteractionManager } from 'react-native'
import { Actions } from 'react-native-router-flux'


export const addCar = (values, parent) => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        dispatch({ type: actionTypes.addCarTypes.add_car_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/car`
        const res = await httpRequest.post(url, objectExceptNull({
            vin: values.vin,
            makeId: values.make.id,
            makeName: values.make.value,
            routeStartId: values.routeStart.id,
            routeStart: values.routeStart.value,
            baseAddrId: values.baseAddr.id,
            routeEndId: values.routeEnd.id,
            routeEnd: values.routeEnd.value,
            receiveId: values.receive.id,
            entrustId: values.entrust.id,
            orderDate: values.orderDate,
            remark: values.remark
        }))
        if(res.success){
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.addCarTypes.add_car_success, payload: { carId: res.id,vin:values.vin } })
            Actions.importCarCameraAtHomeBlock()
        }else{
            ToastAndroid.showWithGravity(`提交失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.addCarTypes.add_car_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.showWithGravity(`提交失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.addCarTypes.add_car_error, payload: { errorMsg: err } })
    }
}