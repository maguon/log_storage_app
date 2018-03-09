import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        user: {}
    },
    login:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.loginActionTypes.change_AvatarImage]: (state, action) => {
        const { payload: { avatar_image } } = action
        return {
            ...state,
            data: {
                ...state.data,
                user: {
                    ...state.data.user,
                    avatar_image
                }
            }
        }
    },
    [actionTypes.loginActionTypes.Set_UserInfo]: (state, action) => {
        const { payload: { user } } = action
        return {
            ...initialState,
            data: {
                user
            }
        }
    },

    [actionTypes.loginActionTypes.login_success]: (state, action) => {
        const { payload: { user } } = action
        return {
            ...state,
            data: {
                user
            },
            login: {
                ...initialState.login,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.loginActionTypes.login_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.loginActionTypes.login_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionTypes.loginActionTypes.login_waiting]: (state, action) => {
        return {
            ...state,
            login: {
                ...initialState.login,
                isResultStatus: 1
            }
        }
    }
}, initialState)