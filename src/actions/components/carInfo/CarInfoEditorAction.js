import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { objectExceptNull } from '../../../util/util'
import { ToastAndroid } from 'react-native'
import moment from 'moment'


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
        if (res.success) {
            console.log(`-${values.orderDate}`.indexOf('-'))
            dispatch({ type: actionTypes.carInfoEditorTypes.update_carInfo_success, payload: {} })
            dispatch({
                type: actionTypes.carListTypes.change_carListCarInfo, payload: {
                    changeField: objectExceptNull({
                        vin: values.vin,
                        make_id: values.make.id,
                        make_name: values.make.value,
                        route_start_id: values.routeStart.id,
                        route_start: values.routeStart.value,
                        route_end_id: values.routeEnd.id,
                        route_end: values.routeEnd.value,
                        base_addr_id: values.baseAddr.id,
                        receive_id: values.receive.id,
                        receive_name: values.receive.value,
                        entrust_id: values.entrust.id,
                        entrust_name: values.entrust.value,
                        order_date: values.orderDate ? values.orderDate : null,
                        remark: values.remark
                    })
                }
            })
        } else {
            dispatch({ type: actionTypes.carInfoEditorTypes.update_carInfo_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: actionTypes.carInfoEditorTypes.update_carInfo_error, payload: { errorMsg: err } })
    }

}
