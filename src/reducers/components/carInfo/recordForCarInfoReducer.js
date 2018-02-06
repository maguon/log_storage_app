import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        recordId:0,
        recordList: []
    },
    getRecordList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.recordForCarInfoTypes.get_recordForCarInfo_success]: (state, action) => {
        const { payload: { recordList,recordId } } = action
        return {
            ...state,
            data: {
                recordId,
                recordList
            },
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.recordForCarInfoTypes.get_recordForCarInfo_failed]: (state, action) => {
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
    [actionTypes.recordForCarInfoTypes.get_recordForCarInfo_waiting]: (state, action) => {
        return {
            ...state,
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.recordForCarInfoTypes.get_recordForCarInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)