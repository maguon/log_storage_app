import httpRequest from '../../../../util/HttpRequest'
import { record_host, file_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const pushCarImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.importCarImageTypes.import_carImage_waiting, payload: {} })
}

export const pushCarImage = (param) => async (dispatch, getState) => {
    try {
        const { cameraReses } = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } }, addCarReducer: { data: { carId, vin } } } = getState()
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
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, res: item, } })
                    .filter(item => item.res.success)
                    .map(item => {
                        return {
                            imageId: item.imageId,
                            id: item.res.result._id
                        }
                    })
                const imageList = bindCarSuccessReses.map(item => item.imageId)
                const recordId = bindCarSuccessReses[0].id
                if (cameraReses.length === bindCarSuccessReses.length) {
                    ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.importCarImageTypes.import_carImage_success, payload: { imageList: imageList, recordId } })
                } else if (bindCarSuccessReses.length > 0) {
                    ToastAndroid.showWithGravity(`部分提交成功：${bindCarSuccessReses.length}/${cameraReses.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.importCarImageTypes.import_carImage_partSuccess, payload: { imageList: imageList, recordId, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.importCarImageTypes.import_carImage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.showWithGravity('提交全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.importCarImageTypes.import_carImage_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.showWithGravity('拍照全部失败！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.importCarImageTypes.import_carImage_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.showWithGravity(`提交全部失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.importCarImageTypes.import_carImage_error, payload: { errorMsg: err } })
    }
}

export const delImage = param => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } },
    importCarImageReducer: { data: { recordId } } } = getState()
    dispatch({ type: actionTypes.importCarImageTypes.del_importCarImage_waiting, payload: {} })
    try {
        const url = `${record_host}/user/${uid}/record/${recordId}/image/${param}`
        const res = await httpRequest.del(url)
        if (res.success) {
            ToastAndroid.showWithGravity('图片删除成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.importCarImageTypes.del_importCarImage_success, payload: { imageurl: param } })
        } else {
            ToastAndroid.showWithGravity(`图片删除失败：${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.importCarImageTypes.del_importCarImage_failed, payload: { failedMsg: res.msg } })
        }

    } catch (err) {
        ToastAndroid.showWithGravity(`图片删除失败：${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.importCarImageTypes.del_importCarImage_error, payload: { errorMsg: err } })
    }
}
