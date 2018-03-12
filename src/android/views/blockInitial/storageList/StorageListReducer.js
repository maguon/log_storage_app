/**
 * Created by lingxue on 2017/4/17.
 */
import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    data: {
        storageList: []
    },
    getStorageList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.storageListTypes.get_storageList_success]: (state, action) => {
        const { payload: { storageList } } = action
        return {
            data: {
                storageList
            },
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.storageListTypes.get_storageList_waiting]: (state, action) => {
        return {
            ...state,
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.storageListTypes.get_storageList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionTypes.storageListTypes.get_storageList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    }
}, initialState)