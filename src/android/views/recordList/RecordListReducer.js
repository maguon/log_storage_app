import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    data: {
        searchParam: {},
        recordList: [],
        isComplete: false
    },
    getRecordList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getRecordListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
    // selectRecordListTab: {
    //     selectedTab: 'all' //all ,import,export,movc
    // }
}
export default handleActions({
    [actionTypes.recordListTypes.get_recordList_success]: (state, action) => {
        const { payload: { searchParam, recordList ,isComplete} } = action
        // console.log('111')
        return {
            ...state,
            data: {
                searchParam,
                recordList,
                isComplete
            },
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.recordListTypes.get_recordList_waiting]: (state, action) => {
        return {
            ...state,
            getRecordList: {
                ...initialState.getRecordList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.recordListTypes.get_recordList_failed]: (state, action) => {
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
    [actionTypes.recordListTypes.get_recordList_error]: (state, action) => {
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





    [actionTypes.recordListTypes.get_recordListMore_success]: (state, action) => {
        const { payload: { recordList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                recordList: [...state.data.recordList, ...recordList],
                isComplete
            },
            getRecordListMore: {
                ...initialState.getRecordListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.recordListTypes.get_recordListMore_waiting]: (state, action) => {
        return {
            ...state,
            getRecordListMore: {
                ...initialState.getRecordListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.recordListTypes.get_recordListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRecordListMore: {
                ...initialState.getRecordListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.recordListTypes.get_recordListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRecordListMore: {
                ...initialState.getRecordListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)



// export default handleActions({
//     [actionTypes.recordListTypes.CHANGE_RECORD_LIST_TAB]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             selectRecordListTab: {
//                 selectedTab: data
//             }
//         }
//     },
//     [actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_FAILED]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getRecordList: {
//                 ...state.getRecordList,
//                 isResultStatus: 2,
//                 isExecStatus: 2,
//                 failedMsg: data
//             }
//         }
//     },
//     [actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_SUCCESS]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getRecordList: {
//                 ...state.getRecordList,
//                 isResultStatus: 0,
//                 isExecStatus: 2,
//                 data: {
//                     recordList: data
//                 }
//             }
//         }
//     },
//     [actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_WAITING]: (state, action) => {
//         return {
//             ...state,
//             getRecordList: {
//                 ...state.getRecordList,
//                 isExecStatus: 1
//             }
//         }
//     },
//     [actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_ERROR]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getRecordList: {
//                 ...state.getRecordList,
//                 isResultStatus: 1,
//                 isExecStatus: 2,
//                 errorMsg: data
//             }
//         }
//     },
//     [actionTypes.recordListTypes.GET_RECORDLIST_MORE_ERROR]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getRecordListMore: {
//                 ...state.getRecordListMore,
//                 isResultStatus: 1,
//                 isExecStatus: 2,
//                 errorMsg: data
//             }
//         }
//     },
//     [actionTypes.recordListTypes.GET_RECORDLIST_MORE_FAILED]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getRecordListMore: {
//                 ...state.getRecordListMore,
//                 isResultStatus: 2,
//                 isExecStatus: 2,
//                 failedMsg: data
//             }
//         }
//     },
//     [actionTypes.recordListTypes.GET_RECORDLIST_MORE_SUCCESS]: (state, action) => {
//         const { payload: { data } } = action
//         return {
//             ...state,
//             getRecordList: {
//                 ...state.getRecordList,
//                 data: {
//                     recordList: [...state.getRecordList.data.recordList, ...data]
//                 }
//             },
//             getRecordListMore: {
//                 ...state.getRecordListMore,
//                 isResultStatus: 0,
//                 isExecStatus: 2,
//             }
//         }
//     },
//     [actionTypes.recordListTypes.GET_RECORDLIST_MORE_WAITING]: (state, action) => {
//         return {
//             ...state,
//             getRecordListMore: {
//                 ...state.getRecordListMore,
//                 isExecStatus: 1,
//             }
//         }
//     }
// }, initialState)