import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    receives: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            receiveList: []
        }
    }
}

export default handleActions({
    [actionTypes.selectReceiveTypes.GET_RECEIVES_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            receives: {
                ...state.receives,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    receiveList: data
                }
            }
        }
    },
    [actionTypes.selectReceiveTypes.GET_RECEIVES_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            receives: {
                ...state.receives,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.selectReceiveTypes.GET_RECEIVES_WAITING]: (state, action) => {
        return {
            receives: {
                ...state.receives,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.selectReceiveTypes.GET_RECEIVES_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            receives: {
                ...state.receives,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    }
}, initialState)

