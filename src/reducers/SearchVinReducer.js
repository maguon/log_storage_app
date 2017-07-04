import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    searchVin: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: '',
        timeStamp: '',
        isComplete: false,
        data: {
            vinList: []
        },
        vin: ''
    }
}

export default handleActions({
    [actionTypes.searchVinTypes.SEARCH_VINLIST_SUCCESS]: (state, action) => {
        const { payload: { data, timeStamp, vin, pageSize } } = action
        if (state.searchVin.timeStamp < timeStamp) {
            let vinList = (vin != state.searchVin.vin) ? data : [...state.searchVin.data.vinList, ...data]
            let isComplete = (data.length % pageSize) != 0 || data.length == 0
            return {
                ...state,
                searchVin: {
                    ...state.searchVin,
                    isResultStatus: 0,
                    isExecStatus: 2,
                    data: {
                        vinList
                    },
                    vin,
                    isComplete
                }
            }
        } else {
            return {
                ...state
            }
        }
    },
    [actionTypes.searchVinTypes.SEARCH_VINLIST_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            searchVin: {
                ...state.searchVin,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data

            }
        }
    },
    [actionTypes.searchVinTypes.SEARCH_VINLIST_WAITING]: (state, action) => {
        return {
            ...state,
            searchVin: {
                ...state.searchVin,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.searchVinTypes.SEARCH_VINLIST_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            searchVin: {
                ...state.searchVin,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.searchVinTypes.SEARCH_VINLIST_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            searchVin: {
                ...state.searchVin,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceFailedMsg: data
            }

        }
    },
    [actionTypes.searchVinTypes.RESET_SEARCH_VINLIST_STATUS]: (state, action) => {
        return {
            ...state,
            searchVin: {
                ...state.searchVin,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.searchVinTypes.RESET_SEARCH_VINLIST]: (state, action) => {
        const { payload: { timeStamp } } = action
        return {
            searchVin: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceFailedMsg: '',
                isComplete: false,
                data: {
                    vinList: []
                },
                timeStamp,
                vin: ''
            }
        }
    }
}, initialState)


