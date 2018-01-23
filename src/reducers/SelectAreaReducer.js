import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


const initialState = {
    data: {
        areaList: []
    },
    getAreaList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [actionTypes.selectAreaTypes.GET_AREAS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data:{
                areaList:data
            },
            getAreaList: {
                ...state.getAreaList,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.selectAreaTypes.GET_AREAS_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getAreaList: {
                ...state.getAreaList,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data

            }
        }
    },
    [actionTypes.selectAreaTypes.GET_AREAS_WAITING]: (state, action) => {
        return {
            ...state,
            getAreaList: {
                ...state.getAreaList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.selectAreaTypes.GET_AREAS_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getAreaList: {
                ...state.getAreaList,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.selectAreaTypes.GET_AREAS_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getAreaList: {
                ...state.getAreaList,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceFailedMsg: data
            }

        }
    }
}, initialState)