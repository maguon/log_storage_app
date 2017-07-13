import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    importCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    }
}


export default handleActions({
    [actionTypes.imporCarTypes.IMPORTCAR_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 0,
                isExecStatus: 2,

            }
        }
    },
    [actionTypes.imporCarTypes.IMPORTCAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORTCAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORTCAR_WAITING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.imporCarTypes.RESET_IMPORTCAR]: (state, action) => {
        return {
            ...state,
            importCar: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceErrorMsg: ''
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORTCAR_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceErrorMsg: data
            }
        }
    }

}, initialState)

