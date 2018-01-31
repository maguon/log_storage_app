import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        entrustList: []
    },
    getEntrustList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.selectEntrustActionTypes.get_entrustList_success]: (state, action) => {
        const { payload: { entrustList } } = action
        return {
            ...state,
            data: {
                entrustList
            },
            getEntrustList: {
                ...initialState.getEntrustList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectEntrustActionTypes.get_entrustList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getEntrustList: {
                ...initialState.getEntrustList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectEntrustActionTypes.get_entrustList_waiting]: (state, action) => {
        return {
            ...state,
            getEntrustList: {
                ...initialState.getEntrustList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectEntrustActionTypes.get_entrustList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getEntrustList: {
                ...initialState.getEntrustList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

