import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'


const pageSize = 50

export const getCarList = (values) => async (dispatch, getState) => {
    const { vinCode, make, storage, routeStart, routeEnd, entrust, orderStart, orderEnd, enterStart, enterEnd, realStart, realEnd } = values
    try {
        const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = getState()
        const url = `${base_host}/car?${ObjectToUrl({
            vinCode,
            makeId: make ? make.id : undefined,
            storageId: storage ? storage.id : undefined,
            routeStartId: routeStart ? routeStart.id : undefined,
            routeEndId: routeEnd ? routeEnd.id : undefined,
            entrustId: entrust ? entrust.id : undefined,
            orderStart,
            orderEnd,
            enterStart,
            enterEnd,
            realStart,
            realEnd,
            active: 1,
            start: 0,
            size: pageSize
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.carListTypes.get_carList_success,
                payload: {
                    carList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })

        } else {
            dispatch({ type: actionTypes.carListTypes.get_carList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carListTypes.get_carList_error, payload: { errorMsg: err } })
    }

}

export const getCarListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carListTypes.get_carList_waiting, payload: {} })
}

export const getCarListMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        carListReducer: { data: { carList, isComplete } },
        carListReducer } = state
    const { communicationSettingReducer: { data: { base_host, record_host, file_host } } } = getState()
    let queryCarForm = getFormValues('queryCarForm')(state)
    queryCarForm = queryCarForm ? queryCarForm : {}
    const { vinCode, make, storage, routeStart, routeEnd, entrust, orderStart, orderEnd, enterStart, enterEnd, realStart, realEnd } = queryCarForm
    if (carListReducer.getCarListMore.isResultStatus == 1) {
        await sleep(1000)
        getCarListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.carListTypes.get_carListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/car?${ObjectToUrl({
                    vinCode: vinCode,
                    makeId: make ? make.id : undefined,
                    storageId: storage ? storage.id : undefined,
                    routeStartId: routeStart ? routeStart.id : undefined,
                    routeEndId: routeEnd ? routeEnd.id : undefined,
                    entrustId: entrust ? entrust.id : undefined,
                    orderStart,
                    orderEnd,
                    enterStart,
                    enterEnd,
                    realStart,
                    realEnd,
                    active: 1,
                    start: carList.length,
                    size: pageSize
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.carListTypes.get_carListMore_success, payload: { carList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.carListTypes.get_carListMore_success, payload: { carList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.carListTypes.get_carListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.carListTypes.get_carListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}

export const removeCar = (carId) => (dispatch) => {
    dispatch({ type: actionTypes.carListTypes.REMOVE_CAR, payload: { data: carId } })
}
