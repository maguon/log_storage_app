/**
 * Created by lingxue on 2017/4/21.
 */
//import { Actions } from 'react-native-router-flux'
import httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import localStorageKey from '../../util/LocalStorageKey'
import localStorage from '../../util/LocalStorage'
import requestHeaders from '../../util/RequestHeaders'
import * as android_app from '../../android_app.json'
import { sleep } from '../../util/util'
import { Actions } from 'react-native-router-flux'
/** 
 * 
 * initApp : APP初始化
 * 
 * param : 对应执行步骤执行时所需要的参数
 * currentStep : 执行到第N步（从1开始）
 * tryCount : 当遇到网络错误的时候尝试的次数（从1开始）
 * 
 * 
 * 初始化流程：
 * 第一步：验证版本是否是最新版本
 * 第二步：获取本地localstorage的数据
 * 第三步：换network request所需要的token
 */
export const initApp = (currentStep = 1, tryCount = 1, param = null) => (dispatch) => {
    if (currentStep == 1) {
        //执行第一步
        //console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
        dispatch(validateVersion(tryCount))
    } else if (currentStep == 2) {
        //执行第二步
        //console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
        dispatch(loadLocalStorage(tryCount))
    } else if (currentStep == 3) {
        //执行第三步
        //console.log(`========执行第${currentStep}步    第${tryCount}次尝试========`)
        dispatch(validateToken(tryCount, param))
    }
}

//第一步：获取最新version信息
export const validateVersion = (tryCount = 1) => async (dispatch) => {
    const currentStep = 1
    try {
        const url = `${base_host}/app?${ObjectToUrl({ app: 1, type: 1 })}`
        const res = await httpRequest.get(url)
        console.log('res',res)
        if (res.success) {
            const data = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            const currentVersionArr = android_app.version.split('.')
            let versionList = res.result
                .filter(item => {
                    const itemArr = item.version.split('.')
                    if (currentVersionArr[0] < itemArr[0]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })

            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    data.force_update = 1
                } else {
                    data.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    const aArr = a.version.split('.')
                    const bArr = b.version.split('.')
                    if (aArr[0] < bArr[0]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
                data.newestVersion = versionList[0].version
                data.url = versionList[0].url
                data.remark = versionList[0].remark

            } else {
                data.force_update = 0
                data.newestVersion = data.currentVersion
            }
            console.log('data',data)
            dispatch({ type: actionTypes.initializationActionTypes.Valdate_Version_Success, payload: { data, step: currentStep } })
            if (data.force_update != 1) {
                dispatch(initApp(currentStep + 1))
            }
        } else {
            dispatch({ type: actionTypes.initializationActionTypes.Valdate_Version_Failed, payload: { failedMsg: res.msg, step: currentStep } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(initApp(currentStep, tryCount + 1))
            } else {
                dispatch({ type: actionTypes.initializationActionTypes.Valdate_Version_NetWorkError, payload: { step: currentStep } })
            }
        } else {
            dispatch({ type: actionTypes.initializationActionTypes.Valdate_Version_Error, payload: { errorMsg: err.message, step: currentStep } })
        }
    }
}

//第二步：获取localStorage中的user数据
export const loadLocalStorage = (tryCount = 1) => async (dispatch) => {
    const currentStep = 2
    try {
        // localStorage.save({
        //     key: localStorageKey.USER,
        //     data: {
        //         userId: 93,
        //         token: 'v4m1x9wFedXZ6S9rbV5Ax-9EAWY=9i39iMZK1a5578b3b728c1f8dbc87071b199c67f8b4ae35e233647cd1825977e83a8c812d194c41a71049edad8470b361d415a76'
        //     }
        // })
        //localStorage.remove({ key: localStorageKey.USER })
        const localStorageRes = await localStorage.load({ key: localStorageKey.USER })
        if (localStorageRes.token && localStorageRes.uid) {
            dispatch({ type: actionTypes.initializationActionTypes.Load_LocalStorage_Success, payload: { step: currentStep } })
            dispatch(initApp(currentStep + 1, 1, {
                requiredParam: {
                    userId: localStorageRes.uid,
                    token: localStorageRes.token
                }
            }))
        }
        else {
            if (localStorageRes.mobile) {
                dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user: { mobile: localStorageRes.mobile } } })
            } else {
                dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user: {} } })
            }
            dispatch({ type: actionTypes.initializationActionTypes.Load_LocalStorage_Failed, payload: { step: currentStep } })
            Actions.mainRoot()
        }
    } catch (err) {
        // console.log(err)
        if (err.name == 'NotFoundError') {
            dispatch({ type: actionTypes.initializationActionTypes.Load_LocalStorage_NotFoundError, payload: { step: currentStep } })

        } else {
            localStorage.remove({ key: localStorageKey.USER })
            dispatch({ type: actionTypes.initializationActionTypes.Load_LocalStorage_Error, payload: { errorMsg: err.message, step: currentStep } })
        }
        Actions.mainRoot()
    }

}

//第三步:更换service-token ,如果更新成功将登陆数据放入userReducer
export const validateToken = (tryCount = 1, param) => async (dispatch) => {
    const currentStep = 3
    try {
        const url = `${base_host}/user/${param.requiredParam.userId}/token/${param.requiredParam.token}`
        const res = await httpRequest.get(url)
        if (res.success) {
            const getUserInfoUrl = `${base_host}/user?${ObjectToUrl({ userId: param.requiredParam.userId })}`
            const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
            if (getUserInfoRes.success) {
                const { uid, mobile, real_name, type, gender, avatar_image, status } = getUserInfoRes.result[0]
                const user = {
                    uid, mobile, real_name, type, gender, avatar_image, status,
                    token: param.requiredParam.token,
                }
                //判断请求是否成功，如果成功，更新token
                localStorage.save({ key: localStorageKey.USER, data: user })
                requestHeaders.set('auth-token', res.result.accessToken)
                requestHeaders.set('user-type', type)
                requestHeaders.set('user-name', mobile)
                dispatch({ type: actionTypes.loginActionTypes.Set_UserInfo, payload: { user } })
                dispatch({ type: actionTypes.initializationActionTypes.validate_token_Success, payload: { step: currentStep } })
                Actions.mainRoot()
            } else {
                ToastAndroid.showWithGravity(`登陆失败：无法获取用户信息！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.initializationActionTypes.validate_token_Failed, payload: { failedMsg: '无法获取用户信息！' } })
            }
        }
        else {
            //判断请求是否成功，如果失败，跳转到登录页
            dispatch({ type: actionTypes.initializationActionTypes.validate_token_Failed, payload: { step: currentStep } })
            Actions.mainRoot()
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            if (tryCount < 20) {
                await sleep(1000)
                dispatch(initApp(currentStep, tryCount + 1, param))
            } else {
                dispatch({ type: actionTypes.initializationActionTypesvalidate_token_NetWorkError, payload: { param, step: currentStep } })
            }
        } else {
            dispatch({ type: actionTypes.initializationActionTypes.validate_token_Error, payload: { step: currentStep } })
            Actions.mainRoot()
        }
    }
}
