import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        makeList: []
    },
    getMakeList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.selectMakeActionTypes.get_makeList_success]: (state, action) => {
        const { payload: { makeList } } = action
        return {
            ...state,
            data: {
                makeList
            },
            getMakeList: {
                ...initialState.getMakeList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectMakeActionTypes.get_makeList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getMakeList: {
                ...initialState.getMakeList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectMakeActionTypes.get_makeList_waiting]: (state, action) => {
        return {
            ...state,
            getMakeList: {
                ...initialState.getMakeList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectMakeActionTypes.get_makeList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getMakeList: {
                ...initialState.getMakeList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

