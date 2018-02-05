import httpRequest from '../../util/HttpRequest'
import { record_host, file_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/ObjectToUrl'

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
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (cameraReses.length === bindCarSuccessReses.length) {
                    ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.importCarImageTypes.import_carImage_success, payload: { imageList: bindCarSuccessReses } })
                } else if (bindCarSuccessReses.length > 0) {
                    ToastAndroid.showWithGravity(`部分提交成功：${bindCarSuccessReses.length}/${cameraReses.length}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                    dispatch({ type: actionTypes.importCarImageTypes.import_carImage_partSuccess, payload: { imageList: bindCarSuccessReses, failedMsg: '部分失败' } })
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
    // let url = `${file_host}user/${param.requiredParam.userId}/image?${ObjectToUrl(param.optionalParam)}`
    // dispatch({ type: actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_WAITING, payload: {} })
    // httpRequest
    //     .postFilecallback(url, param.postFileParam, (err, res) => {
    //         if (err) {
    //             dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_ERROR, payload: { data: err } })
    //         } else {
    //             if (res.success) {
    //                 url = `${record_host}/car/${param.requiredParam.carId}/vin/${param.requiredParam.vin}/storageImage`
    //                 param.postParam.url = res.imageId
    //                 httpRequest.postcallback(url, param.postParam, (carErr, carRes) => {
    //                     if (carErr) {
    //                         dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_ERROR, payload: { data: carErr } })
    //                     } else {
    //                         if (carRes.success) {
    //                             dispatch({
    //                                 type: actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_SUCCESS, payload: {
    //                                     data: {
    //                                         img: `${file_host}image/${res.imageId}`,
    //                                         recordId: carRes.result._id
    //                                     }
    //                                 }
    //                             })
    //                         }
    //                         else {
    //                             dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_FAILED, payload: { data: carRes.msg } })
    //                         }
    //                     }
    //                 })
    //             } else {
    //                 dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_FAILED, payload: { data: res.msg } })
    //             }
    //         }
    //     })
}



export const delImage = (param) => (dispatch) => {
    let url = `${record_host}/user/${param.requiredParam.userId}/record/${param.requiredParam.recordId}/image/${param.requiredParam.url}`
    dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_WAITING, payload: {} })
    httpRequest
        .delcallback(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_SUCCESS, payload: { data: `${file_host}image/${param.requiredParam.url}` } })
                } else {
                    dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const resetDelImage = () => (dispatch) => {
    dispatch({ type: actionTypes.importCarCameraTypes.RESET_IMPORTCARIMAGE, payload: {} })
}
