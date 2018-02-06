import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    importCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.importCarTypes.import_car_success]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...initialState.importCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.importCarTypes.import_car_waiting]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...initialState.importCar,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.importCarTypes.import_car_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            importCar: {
                ...initialState.importCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.importCarTypes.import_car_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            importCar: {
                ...initialState.importCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

