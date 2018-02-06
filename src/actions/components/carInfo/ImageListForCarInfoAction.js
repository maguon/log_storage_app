import httpRequest from '../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const getCarImageList = (param) => async (dispatch, getState) => {
    const { carId } = param
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        const url = `${record_host}/user/${uid}/car/${carId}/record`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.recordForCarInfoTypes.get_recordForCarInfo_success, payload: { recordId: res.result[0]._id, recordList: res.result[0] ? res.result[0].comment : [] } })
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
            const { loginReducer: { data: { user } } } = getState()
            const imageUploadUrl = `${file_host}/user/${user.uid}/image?${ObjectToUrl({ imageType: 4 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {

                const bindCarUrl = url = `${record_host}/car/${carId}/vin/${vin}/storageImage`

                const bindCarReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindCarUrl, {
                    username: user.real_name,
                    userId: user.uid,
                    userType: user.type,
                    url: item.imageId
                })))
                const bindCarSuccessReses = bindCarReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (cameraReses.length === bindCarSuccessReses.length) {
                    ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_success, payload: { carImageList: bindCarSuccessReses } })
                } else if (bindCarSuccessReses.length > 0) {
                    ToastAndroid.showWithGravity(`部分提交成功：${bindCarSuccessReses.length}/${cameraReses.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_partSuccess, payload: { carImageList: bindCarSuccessReses, failedMsg: '部分失败' } })
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

export const delImage = param => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } },
        recordForCarInfoReducer: { data: { recordId } } } = getState()
    dispatch({ type: actionTypes.imageListForCarInfoTypes.del_ImageAtCarInfo_waiting, payload: {} })
    try {
        const url = `${record_host}/user/${uid}/record/${recordId}/image/${param}`
        const res = await httpRequest.del(url)
        if (res.success) {
            ToastAndroid.showWithGravity('图片删除成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageListForCarInfoTypes.del_ImageAtCarInfo_success, payload: { imageurl: param } })
        } else {
            ToastAndroid.showWithGravity(`图片删除失败：${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.imageListForCarInfoTypes.del_ImageAtCarInfo_failed, payload: { failedMsg: res.msg } })
        }

    } catch (err) {
        ToastAndroid.showWithGravity(`图片删除失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.imageListForCarInfoTypes.del_ImageAtCarInfo_error, payload: { errorMsg: err } })
    }
}