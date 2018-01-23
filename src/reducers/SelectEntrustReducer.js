import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    entrusts: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            entrustList: []
        }
    }
}

export default handleActions({
    [actionTypes.selectEntrustTypes.GET_ENTRUSTS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            entrusts: {
                ...state.entrusts,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    entrustList: data
                }
            }
        }
    },
    [actionTypes.selectEntrustTypes.GET_ENTRUSTS_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            entrusts: {
                ...state.entrusts,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.selectEntrustTypes.GET_ENTRUSTS_WAITING]: (state, action) => {
        return {
            entrusts: {
                ...state.entrusts,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.selectEntrustTypes.GET_ENTRUSTS_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            entrusts: {
                ...state.entrusts,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    }
}, initialState)

