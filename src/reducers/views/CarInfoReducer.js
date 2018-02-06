import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data:{
        carInfo:{}
    },
    exportCar: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    importCar:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0  
    },
    sendCar:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0 
    },
    moveCar:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0 
    },
    getCarInfo:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0 
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.carInfoTypes.put_exportCar_success]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...initialState.exportCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.put_exportCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            exportCar: {
                ...initialState.exportCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carInfoTypes.put_exportCar_waiting]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...initialState.exportCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.put_exportCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            exportCar: {
                ...initialState.exportCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.carInfoTypes.put_importCar_success]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...initialState.importCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.put_importCar_failed]: (state, action) => {
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
    [actionTypes.carInfoTypes.put_importCar_waiting]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...initialState.importCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.put_importCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            importCar: {
                ...initialState.importCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.carInfoTypes.put_moveCar_success]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...initialState.moveCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.put_moveCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            moveCar: {
                ...initialState.moveCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carInfoTypes.put_moveCar_waiting]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...initialState.moveCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.put_moveCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            moveCar: {
                ...initialState.moveCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.carInfoTypes.put_sendCar_success]: (state, action) => {
        return {
            ...state,
            sendCar: {
                ...initialState.sendCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.put_sendCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            sendCar: {
                ...initialState.sendCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carInfoTypes.put_sendCar_waiting]: (state, action) => {
        return {
            ...state,
            sendCar: {
                ...initialState.sendCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.put_sendCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            sendCar: {
                ...initialState.sendCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.carInfoTypes.get_carInformation_success]: (state, action) => {
        const { payload: { carInfo } } = action
        return {
            ...state,
            data:{
                carInfo
            },
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.get_carInformation_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carInfoTypes.get_carInformation_waiting]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.get_carInformation_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)