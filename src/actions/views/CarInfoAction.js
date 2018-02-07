import httpRequest from '../../util/HttpRequest'
import { base_host, record_host, file_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import moment from 'moment'
import * as imageListForCarInfoAction from '../components/carInfo/ImageListForCarInfoAction'


export const getCarInfo = param => async (dispatch, getState) => {
    try {
        const url = `${base_host}/car?${ObjectToUrl({ carId: param.car.id, active: 1 })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length > 0) {
                dispatch({ type: actionTypes.carInfoTypes.get_carInformation_success, payload: { carInfo: res.result[0] } })
            } else {
                dispatch({ type: actionTypes.carInfoTypes.get_carInformation_success, payload: { carInfo: param.car } })
            }
        } else {
            dispatch({ type: actionTypes.carInfoTypes.get_carInformation_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoTypes.get_carInformation_error, payload: { errorMsg: err } })
    }
}

export const changeCarListCarInfo = changeField => (dispatch) => {
    dispatch({
        type: actionTypes.carListTypes.change_carListCarInfo, payload: {
            changeField
        }
    })
}

export const changeCarInfo = changeField => (dispatch) => {
    dispatch({
        type: actionTypes.carInfoTypes.change_carInfo, payload: {
            changeField
        }
    })
}

export const getCarInfoWaiting = param => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.get_carInformation_waiting, payload: {} })
}

export const exportCar = (param, change) => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        dispatch({ type: actionTypes.carInfoTypes.put_exportCar_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/carStorageRel/${param.r_id}/relStatus/2?${ObjectToUrl({
            parkingId: param.p_id,
            storageId: param.storage_id,
            carId: param.id
        })}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.carInfoTypes.put_exportCar_success, payload: {} })
            dispatch(change({
                id: param.id,
                area_name: null,
                storage_area_id: null,
                col: null,
                p_id: null,
                row: null,
                storage_id: null,
                storage_name: null,
                car_status: 9,
                rel_status: 2,
                parking_status: null,
                real_out_time: moment().format()
            }))
            dispatch(imageListForCarInfoAction.getCarImageList({ carId: param.id }))
            ToastAndroid.showWithGravity('出库成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        } else {
            dispatch({ type: actionTypes.carInfoTypes.put_exportCar_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`出库失败:${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoTypes.put_exportCar_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`出库失败:${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}

export const moveCar = (param, change) => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        dispatch({ type: actionTypes.carInfoTypes.put_moveCar_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/storageParking/${param.col.id}?${ObjectToUrl({ carId: param.carId })}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.carInfoTypes.put_exportCar_success, payload: {} })
            dispatch(change({
                id: param.carId,
                area_name: param.area.value,
                storage_area_id: param.area.id,
                col: param.col.value,
                p_id: param.col.id,
                row: param.row.value
            }))
            ToastAndroid.showWithGravity('移位成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch(imageListForCarInfoAction.getCarImageList({ carId: param.carId }))
        } else {
            dispatch({ type: actionTypes.carInfoTypes.put_exportCar_failed, payload: { failedMsg: res.msg } })
            ToastAndroid.showWithGravity(`移位失败:${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)

        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoTypes.put_exportCar_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`移位失败:${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)

    }
}

export const importCar = (param, change) => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        dispatch({ type: actionTypes.carInfoTypes.put_importCar_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/car/${param.car.id}/carStorageRel?${ObjectToUrl({
            vin: param.car.vin
        })}`
        const res = await httpRequest.put(url, {
            parkingId: param.col.id,
            storageId: param.storage.id,
            storageName: param.storage.value,
        })
        if (res.success) {
            dispatch({ type: actionTypes.carInfoTypes.put_importCar_success, payload: {} })
            ToastAndroid.showWithGravity('入库成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch(change({
                id: param.car.id,
                area_name: param.area.value,
                storage_area_id: param.area.id,
                col: param.col.value,
                p_id: param.col.id,
                row: param.row.value,
                storage_id: param.storage.id,
                storage_name: param.storage.value,
                car_status: 1,
                rel_status: 1,
                parking_status: 1,
                enter_time: moment().format(),
                r_id: res.result.relId,
                real_out_time: null
            }))
            dispatch(imageListForCarInfoAction.getCarImageList({ carId: param.car.id }))
        } else {
            dispatch({ type: actionTypes.carInfoTypes.put_importCar_error, payload: { failedMsg: err } })
            ToastAndroid.showWithGravity(`入库失败:${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoTypes.put_importCar_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`入库失败:${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}

export const sendCar = (param,change) => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        dispatch({ type: actionTypes.carInfoTypes.put_sendCar_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/car/${param.carId}/carStatus/9`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.carInfoTypes.put_sendCar_success, payload: {} })
            dispatch(change({
                id: param.carId,
                car_status: 9
            }))
            dispatch(imageListForCarInfoAction.getCarImageList({ carId: param.carId }))
        } else {
            dispatch({ type: actionTypes.carInfoTypes.put_sendCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoTypes.put_sendCar_error, payload: { errorMsg: err } })
    }
}