import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getVinList: {
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
    },
    search: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: '',
        car: {}
        //relStatus: 0   //0为没有查询到，1为已入库，2未入库,3已出库
    }
}

export default handleActions({
    [actionTypes.searchVinTypes.GET_VINLIST_SUCCESS]: (state, action) => {
        const { payload: { data, timeStamp, vin, pageSize } } = action
        if (state.getVinList.timeStamp < timeStamp) {
            let vinList = (vin != state.getVinList.vin) ? data : [...state.getVinList.data.vinList, ...data]
            let isComplete = (data.length % pageSize) != 0 || data.length == 0
            return {
                ...state,
                getVinList: {
                    ...state.getVinList,
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
    [actionTypes.searchVinTypes.GET_VINLIST_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getVinList: {
                ...state.getVinList,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data

            }
        }
    },
    [actionTypes.searchVinTypes.GET_VINLIST_WAITING]: (state, action) => {
        return {
            ...state,
            getVinList: {
                ...state.getVinList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.searchVinTypes.GET_VINLIST_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getVinList: {
                ...state.getVinList,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.searchVinTypes.GET_VINLIST_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getVinList: {
                ...state.getVinList,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceFailedMsg: data
            }

        }
    },
    [actionTypes.searchVinTypes.RESET_GET_VINLIST_STATUS]: (state, action) => {
        return {
            ...state,
            getVinList: {
                ...state.getVinList,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.searchVinTypes.RESET_GET_VINLIST]: (state, action) => {
        const { payload: { timeStamp } } = action
        return {
            ...state,
            getVinList: {
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
    },

    [actionTypes.searchVinTypes.SEARCH_CAR_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            search: {
                ...state.search,
                isResultStatus: 0,
                isExecStatus: 2,
                car: data
            }
        }
    },
    [actionTypes.searchVinTypes.SEARCH_CAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            search: {
                ...state.search,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.searchVinTypes.SEARCH_CAR_WAITING]: (state, action) => {
        return {
            ...state,
            search: {
                ...state.search,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.searchVinTypes.SEARCH_CAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            search: {
                ...state.search,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.searchVinTypes.SEARCH_CAR_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            search: {
                ...state.search,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceFailedMsg: data
            }
        }
    }
}, initialState)