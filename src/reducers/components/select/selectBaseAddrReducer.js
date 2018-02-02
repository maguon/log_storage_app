import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        baseAddrList: []
    },
    getBaseAddrList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.selectBaseAddrActionTypes.get_baseAddrList_success]: (state, action) => {
        const { payload: { baseAddrList } } = action
        return {
            ...state,
            data: {
                baseAddrList
            },
            getBaseAddrList: {
                ...initialState.getBaseAddrList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectBaseAddrActionTypes.get_baseAddrList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getBaseAddrList: {
                ...initialState.getBaseAddrList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectBaseAddrActionTypes.get_baseAddrList_waiting]: (state, action) => {
        return {
            ...state,
            getBaseAddrList: {
                ...initialState.getBaseAddrList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectBaseAddrActionTypes.get_baseAddrList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getBaseAddrList: {
                ...initialState.getBaseAddrList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
