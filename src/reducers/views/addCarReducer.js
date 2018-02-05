import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        carId: 3644,
        vin:'6432'
    },
    createCar: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.addCarTypes.add_car_success]: (state, action) => {
        const { payload: { carId,vin } } = action
        return {
            ...state,
            data: {
                carId,
                vin
            },
            createCar: {
                ...initialState.createCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addCarTypes.add_car_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createCar: {
                ...initialState.createCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addCarTypes.add_car_waiting]: (state, action) => {
        return {
            ...state,
            createCar: {
                ...initialState.createCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addCarTypes.add_car_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createCar: {
                ...initialState.createCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)