import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        recordList: []
    },
    getRecordList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.homeTypes.GET_RECORDS_HOME_SUCCESS]: (state, action) => {
        const { payload: { recordList } } = action
        return {
            ...state,
            data: {
                recordList
            },
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.homeTypes.GET_RECORDS_HOME_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.homeTypes.GET_RECORDS_HOME_WAITING]: (state, action) => {
        return {
            ...state,
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.homeTypes.GET_RECORDS_HOME_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)