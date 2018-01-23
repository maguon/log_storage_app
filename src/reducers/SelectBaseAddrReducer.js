import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    baseAddrs: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            baseAddrList: []
        }
    }
}

export default handleActions({
    [actionTypes.selectBaseAddrTypes.GET_BASEADDRS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            baseAddrs: {
                ...state.baseAddrs,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    baseAddrList: data
                }
            }
        }
    },
    [actionTypes.selectBaseAddrTypes.GET_BASEADDRS_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            baseAddrs: {
                ...state.baseAddrs,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.selectBaseAddrTypes.GET_BASEADDRS_WAITING]: (state, action) => {
        return {
            baseAddrs: {
                ...state.baseAddrs,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.selectBaseAddrTypes.GET_BASEADDRS_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            baseAddrs: {
                ...state.baseAddrs,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    }
}, initialState)

