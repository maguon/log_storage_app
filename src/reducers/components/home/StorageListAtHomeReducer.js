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
    [actionTypes.homeTypes.GET_STORAGES_HOME_SUCCESS]: (state, action) => {
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
    [actionTypes.homeTypes.GET_STORAGES_HOME_FAILED]: (state, action) => {
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
    [actionTypes.homeTypes.GET_STORAGES_HOME_WAITING]: (state, action) => {
        return {
            ...state,
            getStorageList: {
                ...initialState.getStorageList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.homeTypes.GET_STORAGES_HOME_ERROR]: (state, action) => {
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
}, initialState)