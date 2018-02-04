import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { objectExceptNull } from '../../../util/util'
import { ToastAndroid } from 'react-native'

export const updateCarInfo = (values) => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        dispatch({ type: actionTypes.carInfoEditorTypes.update_carInfo_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/car/${values.carId}`
        const res = await httpRequest.put(url, objectExceptNull({
            vin: values.vin,
            makeId: values.make.id,
            makeName: values.make.value,
            routeStartId: values.routeStart.id,
            routeStart: values.routeStart.value,
            routeEndId: values.routeEnd.id,
            routeEnd: values.routeEnd.value,
            baseAddrId: values.baseAddr.id,
            receiveId: values.receive.id,
            entrustId: values.entrust.id,
            orderDate: values.orderDate ? values.orderDate : null,
            remark: values.remark
        }))
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.carInfoEditorTypes.update_carInfo_success, payload: {} })
        } else {
            dispatch({ type: actionTypes.carInfoEditorTypes.update_carInfo_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: actionTypes.carInfoEditorTypes.update_carInfo_error, payload: { errorMsg: err } })
    }

}
