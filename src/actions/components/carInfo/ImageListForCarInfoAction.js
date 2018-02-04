import httpRequest from '../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const getCarImageList = (param) => async (dispatch, getState) => {
    const { carId } = param
    const { LoginReducer: { user: { userId } } } = getState()
    try {
        const url = `${record_host}/user/${userId}/car/${carId}/record`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.recordForCarInfoTypes.get_recordForCarInfo_success, payload: { recordList: res.result[0] ? res.result[0].comment : [] } })
            dispatch({ type: actionTypes.imageListForCarInfoTypes.get_carImageList_success, payload: { carImageList: res.result[0] ? res.result[0].storage_image : [] } })
        } else {
            dispatch({ type: actionTypes.imageListForCarInfoTypes.get_carImageList_failed, payload: { failedMsg: res.msg } })
            dispatch({ type: actionTypes.recordForCarInfoTypes.get_recordForCarInfo_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.imageListForCarInfoTypes.get_carImageList_error, payload: { errorMsg: err } })
        dispatch({ type: actionTypes.recordForCarInfoTypes.get_recordForCarInfo_error, payload: { errorMsg: err } })
    }
}

export const getCarImageListWaiting = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.imageListForCarInfoTypes.get_carImageList_waiting, payload: {} })
    dispatch({ type: actionTypes.recordForCarInfoTypes.get_recordForCarInfo_waiting, payload: {} })
}

export const uploadCarImageWaiting = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_waiting, payload: {} })
}

export const uploadCarImage = param => async (dispatch, getState) => {
    try {
        const { cameraReses, carId, vin } = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { LoginReducer: { user } } = getState()
            const imageUploadUrl = `${file_host}/user/${user.userId}/image?${ObjectToUrl({ imageType: 4 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {

                const bindDamageUrl = url = `${record_host}/car/${carId}/vin/${vin}/storageImage`
                const bindDamageReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindDamageUrl, {
                    username: user.real_name,
                    userId: user.uid,
                    userType: user.type,
                    url: item.imageId
                })))
                const bindDamageSuccessReses = bindDamageReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (cameraReses.length === bindDamageSuccessReses.length) {
                    ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_success, payload: { carImageList: bindDamageSuccessReses } })
                } else if (bindDamageSuccessReses.length > 0) {
                    ToastAndroid.showWithGravity(`部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_partSuccess, payload: { carImageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_error, payload: { errorMsg: err } })
    }
}
