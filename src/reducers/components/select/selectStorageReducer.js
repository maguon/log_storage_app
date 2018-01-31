import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        storageList: []
    },
    getStorageList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.selectStorageActionTypes.get_storageList_success]: (state, action) => {
        const { payload: { storageList } } = action
        return {
            ...state,
            data: {
                storageList
            },
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectStorageActionTypes.get_storageList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectStorageActionTypes.get_storageList_waiting]: (state, action) => {
        return {
            ...state,
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectStorageActionTypes.get_storageList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
