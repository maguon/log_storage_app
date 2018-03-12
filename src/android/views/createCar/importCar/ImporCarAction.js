import httpRequest from '../../../../util/HttpRequest'
import { base_host, file_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import { Actions } from 'react-native-router-flux'
import { ToastAndroid } from 'react-native'

export const importCar = (param) =>async (dispatch,getState) => {
    const { loginReducer: { data: { user: { uid } } }, 
    addCarReducer: { data: { carId, vin } } } = getState()
    try{
        dispatch({ type: actionTypes.importCarTypes.import_car_waiting, payload: {} })
        const url = `${base_host}/user/${uid}/car/${carId}/carStorageRel?${ObjectToUrl({
            vin:vin
        })}`
        const res =await  httpRequest.put(url,{
            parkingId: param.col.id,
            storageId: param.storage.id,
            storageName: param.storage.value,
        })
        if(res.success){
            dispatch({ type: actionTypes.importCarTypes.import_car_success, payload: {} })
            ToastAndroid.showWithGravity('入库成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            Actions.popTo('home')
        }else{
            dispatch({ type: actionTypes.importCarTypes.import_car_failed, payload: { failedMsg: err } })
            ToastAndroid.showWithGravity(`入库失败:${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            Actions.popTo('home')
        }
    }catch(err){
        dispatch({ type: actionTypes.importCarTypes.import_car_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`入库失败:${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        Actions.popTo('importCarAtHomeBlock')
    }
}