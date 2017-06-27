import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    addCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: '',
        data:{
            // vin: '',
            // makeName: '请选择',
            // makeId: 0,
            // receiveId: 0,
            // receive: '请选择',
            // entrustId: 0,
            // entrust: '清选择',
            // remark: '',
            // orderDate: '请选择',
            // routeStartId: 0,
            // routeStart: '请选择',
            // routeEndId: 0,
            // routeEnd: '请选择'
        }
    }
}


export default handleActions({
    [actionTypes.addCarTypes.ADD_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isExecStatus: 2,
                isResultStatus: 0
            }
        }
    },
    [actionTypes.addCarTypes.ADD_CAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.addCarTypes.ADD_CAR_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isExecStatus: 2,
                isResultStatus: 3,
                serviceErrorMsg: data
            }
        }
    },
    [actionTypes.addCarTypes.ADD_CAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.addCarTypes.ADD_CAR_WAITING]: (state, action) => {
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isExecStatus: 1,
            }

        }
    },
    [actionTypes.addCarTypes.RESET_ADD_CAR_STATUS]: (state, action) => {
        return {
            ...state,
            addCar: {
                ...state.addCar,
                isExecStatus: 0,
            }
        }
    },
    [actionTypes.addCarTypes.RESET_ADD_CAR]: (state, action) => {
        return {
            ...state,
            addCar: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceErrorMsg: '',
                data: {
                    vin: '',
                    makeName: '',
                    makeId: 0,
                    receiveId: 0,
                    entrustId: 0,
                    remark: '',
                    orderDate: '',
                    routeStartId: 0,
                    routeStart: '',
                    routeEndId: 0,
                    routeEnd: ''
                }
            }
        }
    },
    [actionTypes.addCarTypes.CHANGE_ADD_CAR_FIELD]: (state, action) => {
        const { payload: { data } } = action
        let param = { ...state }
        for (key in data) {
            param.addCar.data[key] = data[key]
        }
        return param
    }
}, initialState)
