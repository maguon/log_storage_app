import * as actionTypes from '../../../actionTypes/index'
import * as communicationSettingActions from '../communicationSetting/communicationSettingActions'
import localStorageKey from '../../../util/LocalStorageKey'
import localStorage from '../../../util/LocalStorage'
import httpRequest from '../../../util/HttpRequest'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import requestHeaders from '../../../util/RequestHeaders'
import * as android_app from '../../../android_app.json'
// import XGPush from 'react-native-xinge-push'
import { Actions } from 'react-native-router-flux'



export const start = () => async (dispatch, getState) => {
    dispatch({type:actionTypes.initializationActionTypes.init_app_waiting})
    dispatch(getCommunicationSetting({
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 0,//0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
            url: '',
            remark: ''
        }
    }))
}


/** 
 * 第一步：获取host，
 *          如果localStorage中有，从localStorage中取，
 *          如果没有跳转到login页面
 */
export const getCommunicationSetting = param => async (dispatch) => {
    const currentStep = 1
    // console.log('param',param)
    try {
        const serverAddress = await localStorage.load({ key: localStorageKey.SERVERADDRESS })
        // console.log('serverAddress',serverAddress)
        const { host } = serverAddress
        if (host) {
            await dispatch(communicationSettingActions.saveCommunicationSetting({ url: host }))
            dispatch((validateVersion(param)))
        } else {
            dispatch({ type: actionTypes.initializationActionTypes.init_app_failed, payload: { currentStep, param, msg: '获取host失败' } })
            Actions.mainRoot()
        }
    } catch (err) {
        console.log('err',err)
        dispatch({ type: actionTypes.initializationActionTypes.init_app_error, payload: { currentStep, param, msg: '获取host失败' } })
        Actions.mainRoot()
    }
}

/** 
 * 第二步：获取最新version信息并对比，
 *          如果获取失败，停止初始化流程，等待用户手动点击获取
 *          如果获取成功，对比是否需要强制更新 force_update:0(版本为最新版), 1(版本过低，强制更新), 2(版本过低，但不需要强制更新)
 */
export const validateVersion = param => async (dispatch, getState) => {
    // console.log('validateVersionParam', param)
    const currentStep = 2
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            const versionInfo = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            let versionList = res.result
                .filter(item => {
                    return item.version > android_app.version
                })
            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    versionInfo.force_update = 1
                } else {
                    versionInfo.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    if (a.version < b.version) {
                        return 1
                    }
                    if (a.version > b.version) {
                        return -1
                    }
                    return 0
                })
                versionInfo.newestVersion = versionList[0].version
                versionInfo.url = versionList[0].url
                versionInfo.remark = versionList[0].remark
            } else {
                versionInfo.force_update = 0
                versionInfo.newestVersion = versionInfo.currentVersion
            }
            // versionInfo.force_update=1
            // console.log('versionInfo', versionInfo)
            if (versionInfo.force_update != 1) {
                dispatch(loadLocalStorage({ ...param, version: versionInfo }))
            }else{
                dispatch({ type: actionTypes.initializationActionTypes.init_app_complete, payload: { param:{...param, version: versionInfo} } })
            }
        } else {
            // console.log('failed获取版本错误')
            dispatch({ type: actionTypes.initializationActionTypes.init_app_failed, payload: { currentStep, msg: '获取版本错误', param } })
        }
    } catch (err) {
        // console.log('error获取版本错误', err)
        dispatch({ type: actionTypes.initializationActionTypes.init_app_error, payload: { currentStep, msg: '获取版本错误', param } })
    }
}




/** 
 * 第三步：获取最新user数据，
 *          如果获取失败，跳转到登录页面
 *          如果获取成功，继续流程
 */
export const loadLocalStorage = param => async (dispatch) => {
    // console.log('loadLocalStorageParam', param)
    const currentStep = 3
    try {
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
        if (localStorageRes.token && localStorageRes.uid) {
            dispatch(validateToken({ param, user: localStorageRes }))
        }
        else {
            if (localStorageRes.mobile) {
                dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user: { mobile: localStorageRes.mobile } } })
            } else {
                dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user: {} } })
            }
            dispatch({ type: actionTypes.initializationActionTypes.init_app_failed, payload: { currentStep, msg: '登陆未执行', param } })
            Actions.mainRoot()
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationActionTypes.init_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        Actions.mainRoot()
    }
}


/** 
 * 第四步：先获取用户信息，然后更新token，
 *          如果获取用户信息失败，跳转到登录
 *          如果获取用户信息成功，继续更新token
 *          如果更新token失败，跳转到登录
 *          如果更新token成功，继续流程
 */
export const validateToken = ({ param, user }) => async (dispatch, getState) => {
    // console.log('validateTokenParam', param)
    const currentStep = 4
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { uid, token } = user
        const url = `${base_host}/user/${uid}/token/${token}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: uid })}`
            const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
            if (getUserInfoRes.success) {
                const { uid, mobile, real_name, type, gender, avatar_image, status, drive_id } = getUserInfoRes.result[0]
                const user = {
                    uid, mobile, real_name, type, gender, avatar_image, status, drive_id,
                    token: res.result.accessToken,
                }
                //判断请求是否成功，如果成功，更新token
                localStorage.save({ key: localStorageKey.USER, data: user })
                requestHeaders.set('auth-token', res.result.accessToken)
                requestHeaders.set('user-type', type)
                requestHeaders.set('user-name', mobile)
                await dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user } })
                dispatch(loadDeviceToken(param))
            } else {
                dispatch({ type: actionTypes.initializationActionTypes.init_app_failed, payload: { currentStep, msg: '无法换token', param } })
                Actions.mainRoot()
            }
        }
        else {
            dispatch({ type: actionTypes.initializationActionTypes.init_app_failed, payload: { currentStep, msg: '无法换token', param } })
            Actions.mainRoot()
        }
    } catch (err) {
        dispatch({ type: actionTypes.initializationActionTypes.init_app_error, payload: { currentStep, msg: '登陆未执行', param } })
        Actions.mainRoot()
    }
}



// /**
//  * Created by lingxue on 2017/4/21.
//  */
// //import { Actions } from 'react-native-router-flux'
// import httpRequest from '../../../util/HttpRequest'
// import { base_host } from '../../../config/Host'
// import * as actionTypes from '../../../actionTypes/index'
// import { ObjectToUrl } from '../../../util/ObjectToUrl'
// import localStorageKey from '../../../util/LocalStorageKey'
// import localStorage from '../../../util/LocalStorage'
// import requestHeaders from '../../../util/RequestHeaders'
// import * as android_app from '../../../android_app.json'
// import { sleep } from '../../../util/util'
// import { Actions } from 'react-native-router-flux'
// /** 
//  * 
//  * initApp : APP初始化
//  * 
//  * param : 对应执行步骤执行时所需要的参数
//  * currentStep : 执行到第N步（从1开始）
//  * tryCount : 当遇到网络错误的时候尝试的次数（从1开始）
//  * 
//  * 
//  * 初始化流程：
//  * 第一步：验证版本是否是最新版本
//  * 第二步：获取本地localstorage的数据
//  * 第三步：换network request所需要的token
//  */
// export const initApp = (currentStep = 1, tryCount = 1, param = null) => (dispatch) => {
//     if (currentStep == 1) {
//         //执行第一步
//         //console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
//         dispatch(validateVersion(tryCount))
//     } else if (currentStep == 2) {
//         //执行第二步
//         //console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
//         dispatch(loadLocalStorage(tryCount))
//     } else if (currentStep == 3) {
//         //执行第三步
//         //console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
//         dispatch(validateToken(tryCount, param))
//     }
// }


// /** 
//  * 第二步：获取host，
//  *          如果localStorage中有，从localStorage中取，
//  *          如果没有跳转到login页面
//  */
// export const getCommunicationSetting = param => async (dispatch) => {
//     const currentStep = 1
//     try {
//         const serverAddress = await localStorage.load({ key: localStorageKey.SERVERADDRESS })
//         const { host } = serverAddress
//         if (host) {
//             await dispatch(actions.communicationSetting.saveCommunicationSetting({ url: host }))
//             dispatch((validateVersion(param)))
//         } else {
//             dispatch({ type: actionTypes.initializationActionTypes.init_app_failed, payload: { currentStep, param, msg: '获取host失败' } })
//             Actions.mainRoot()
//         }
//     } catch (err) {
//         dispatch({ type: actionTypes.initializationActionTypes.init_app_error, payload: { currentStep, param, msg: '获取host失败' } })
//         Actions.mainRoot()
//     }
// }

// //第一步：获取最新version信息
// export const validateVersion = (tryCount = 1) => async (dispatch,getState) => {
//     const currentStep = 1
//     try {
//         const { communicationSettingReducer: { data: { base_host1 } } } = getState()
//         console.log('base_host1', base_host1)
//         const url = `${base_host}/app?${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
//         // console.log('url', url)
//         const res = await httpRequest.get(url)
//         if (res.success) {
//             const data = {
//                 currentVersion: android_app.version,
//                 newestVersion: '',
//                 url: '',
//                 remark: '',
//                 force_update: 0
//             }
//             const currentVersionArr = android_app.version.split('.')
//             let versionList = res.result
//                 .filter(item => {
//                     const itemArr = item.version.split('.')
//                     if (currentVersionArr[0] < itemArr[0]) {
//                         return true
//                     } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
//                         return true
//                     } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
//                         return true
//                     } else {
//                         return false
//                     }
//                 })

//             if (versionList.length > 0) {
//                 if (versionList.some(item => item.force_update == 1)) {
//                     data.force_update = 1
//                 } else {
//                     data.force_update = 2
//                 }
//                 versionList = versionList.sort((a, b) => {
//                     const aArr = a.version.split('.')
//                     const bArr = b.version.split('.')
//                     if (aArr[0] < bArr[0]) {
//                         return true
//                     } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
//                         return true
//                     } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
//                         return true
//                     } else {
//                         return false
//                     }
//                 })
//                 data.newestVersion = versionList[0].version
//                 data.url = versionList[0].url
//                 data.remark = versionList[0].remark

//             } else {
//                 data.force_update = 0
//                 data.newestVersion = data.currentVersion
//             }
//             dispatch({ type: actionTypes.initializationActionTypes.Valdate_Version_Success, payload: { data, step: currentStep } })
//             if (data.force_update != 1) {
//                 dispatch(initApp(currentStep + 1))
//             }
//         } else {
//             dispatch({ type: actionTypes.initializationActionTypes.Valdate_Version_Failed, payload: { failedMsg: res.msg, step: currentStep } })
//         }
//     } catch (err) {
//         if (err.message == 'Network request failed') {
//             //尝试20次
//             if (tryCount < 20) {
//                 await sleep(1000)
//                 dispatch(initApp(currentStep, tryCount + 1))
//             } else {
//                 dispatch({ type: actionTypes.initializationActionTypes.Valdate_Version_NetWorkError, payload: { step: currentStep } })
//             }
//         } else {
//             dispatch({ type: actionTypes.initializationActionTypes.Valdate_Version_Error, payload: { errorMsg: err.message, step: currentStep } })
//         }
//     }
// }

// //第二步：获取localStorage中的user数据
// export const loadLocalStorage = (tryCount = 1) => async (dispatch) => {
//     const currentStep = 2
//     try {
//         // localStorage.save({
//         //     key: localStorageKey.USER,
//         //     data: {
//         //         userId: 93,
//         //         token: 'v4m1x9wFedXZ6S9rbV5Ax-9EAWY=9i39iMZK1a5578b3b728c1f8dbc87071b199c67f8b4ae35e233647cd1825977e83a8c812d194c41a71049edad8470b361d415a76'
//         //     }
//         // })
//         //localStorage.remove({ key: localStorageKey.USER })
//         const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
//         if (localStorageRes.token && localStorageRes.uid) {
//             dispatch({ type: actionTypes.initializationActionTypes.Load_LocalStorage_Success, payload: { step: currentStep } })
//             dispatch(initApp(currentStep + 1, 1, {
//                 requiredParam: {
//                     userId: localStorageRes.uid,
//                     token: localStorageRes.token
//                 }
//             }))
//         }
//         else {
//             if (localStorageRes.mobile) {
//                 dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user: { mobile: localStorageRes.mobile } } })
//             } else {
//                 dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user: {} } })
//             }
//             dispatch({ type: actionTypes.initializationActionTypes.Load_LocalStorage_Failed, payload: { step: currentStep } })
//             Actions.mainRoot()
//         }
//     } catch (err) {
//         // console.log(err)
//         if (err.name == 'NotFoundError') {
//             dispatch({ type: actionTypes.initializationActionTypes.Load_LocalStorage_NotFoundError, payload: { step: currentStep } })

//         } else {
//             localStorage.remove({ key: localStorageKey.USER })
//             dispatch({ type: actionTypes.initializationActionTypes.Load_LocalStorage_Error, payload: { errorMsg: err.message, step: currentStep } })
//         }
//         Actions.mainRoot()
//     }

// }

// //第三步:更换service-token ,如果更新成功将登陆数据放入userReducer
// export const validateToken = (tryCount = 1, param) => async (dispatch) => {
//     const currentStep = 3
//     try {
//         const url = `${base_host}/user/${param.requiredParam.userId}/token/${param.requiredParam.token}`
//         const res = await httpRequest.get(url)
//         if (res.success) {
//             const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: param.requiredParam.userId })}`
//             const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
//             if (getUserInfoRes.success) {
//                 const { uid, mobile, real_name, type, gender, avatar_image, status } = getUserInfoRes.result[0]
//                 const user = {
//                     uid, mobile, real_name, type, gender, avatar_image, status,
//                     token: param.requiredParam.token,
//                 }
//                 //判断请求是否成功，如果成功，更新token
//                 localStorage.save({ key: localStorageKey.USER, data: user })
//                 requestHeaders.set('auth-token', res.result.accessToken)
//                 requestHeaders.set('user-type', type)
//                 requestHeaders.set('user-name', mobile)
//                 dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user } })
//                 dispatch({ type: actionTypes.initializationActionTypes.validate_token_Success, payload: { step: currentStep } })
//                 Actions.mainRoot()
//             } else {
//                 ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
//                 dispatch({ type: actionTypes.initializationActionTypes.validate_token_Failed, payload: { failedMsg: '无法获取用户信息！' } })
//             }
//         }
//         else {
//             //判断请求是否成功，如果失败，跳转到登录页
//             dispatch({ type: actionTypes.initializationActionTypes.validate_token_Failed, payload: { step: currentStep } })
//             Actions.mainRoot()
//         }
//     } catch (err) {
//         if (err.message == 'Network request failed') {
//             //尝试20次
//             if (tryCount < 20) {
//                 await sleep(1000)
//                 dispatch(initApp(currentStep, tryCount + 1, param))
//             } else {
//                 dispatch({ type: actionTypes.initializationActionTypesvalidate_token_NetWorkError, payload: { param, step: currentStep } })
//             }
//         } else {
//             dispatch({ type: actionTypes.initializationActionTypes.validate_token_Error, payload: { step: currentStep } })
//             Actions.mainRoot()
//         }
//     }
// }
