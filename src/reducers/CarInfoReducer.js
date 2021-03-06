import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    data: {
        recordList: [],
        imageList: [],
        car: {
            rel_status: 1,
            vin: '',
            make_name: '',
            en_short_name: '',
            re_short_name: '',
            addr_name: '',
            route_start: '',
            route_end: '',
            order_date: ''
        },
        recordId: '',
        carId: 0
    },
    getCarInfo: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    },
    updateCarInfo: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    },
    importCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    },
    exportCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    },
    moveCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    },
    appendImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    },
    delImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    },
    sendCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceErrorMsg: ''
    }
}

export default handleActions({
    [actionTypes.carInfoTypes.GET_CARINFO_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_WAITING]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceErrorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_GET_CARINFO]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceErrorMsg: ''
            }
        }
    },

    [actionTypes.carInfoTypes.UPDATE_CARINFO_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateCarInfo: {
                ...state.updateCarInfo,
                isExecStatus: 2,
                isResultStatus: 0
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateCarInfo: {
                ...state.updateCarInfo,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_WAITING]: (state, action) => {
        return {
            ...state,
            updateCarInfo: {
                ...state.updateCarInfo,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateCarInfo: {
                ...state.updateCarInfo,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updateCarInfo: {
                ...state.updateCarInfo,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceErrorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_UPDATE_CARINFO]: (state, action) => {
        return {
            ...state,
            updateCarInfo: {
                ...state.updateCarInfo,
                isExecStatus: 0
            }
        }
    },

    [actionTypes.carInfoTypes.IMPORT_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.IMPORT_CAR_FAILED]: (state, action) => {
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
    [actionTypes.carInfoTypes.IMPORT_CAR_WAITING]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.IMPORT_CAR_ERROR]: (state, action) => {
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
    [actionTypes.carInfoTypes.IMPORT_CAR_SERVICEERROR]: (state, action) => {
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
    },
    [actionTypes.carInfoTypes.RESET_IMPORT_CAR]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isExecStatus: 0
            }
        }
    },

    [actionTypes.carInfoTypes.MOVE_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            moveCar: {
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.MOVE_CAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.MOVE_CAR_WAITING]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.MOVE_CAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.MOVE_CAR_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceErrorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_MOVE_CAR]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isExecStatus: 0
            }
        }
    },

    [actionTypes.carInfoTypes.EXPORT_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_WAITING]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 1,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceErrorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_EXPORT_CAR]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isExecStatus: 0
            }
        }
    },

    [actionTypes.carInfoTypes.APPEND_IMAGE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            appendImage: {
                ...state.appendImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_IMAGE_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            appendImage: {
                ...state.appendImage,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_IMAGE_WAITING]: (state, action) => {
        return {
            ...state,
            appendImage: {
                ...state.appendImage,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_IMAGE_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            appendImage: {
                ...state.appendImage,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_IMAGE_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            appendImage: {
                ...state.appendImage,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceErrorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_APPEND_IMAGE]: (state, action) => {
        return {
            ...state,
            appendImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceErrorMsg: ''
            }
        }
    },

    [actionTypes.carInfoTypes.DELETE_IMAGE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delImage: {
                ...state.delImage,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.DELETE_IMAGE_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delImage: {
                ...state.delImage,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.DELETE_IMAGE_WAITING]: (state, action) => {
        return {
            ...state,
            delImage: {
                ...state.delImage,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.DELETE_IMAGE_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delImage: {
                ...state.delImage,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.DELETE_IMAGE_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delImage: {
                ...state.delImage,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceErrorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_DELETE_IMAGE]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceErrorMsg: ''
            }
        }
    },

    [actionTypes.carInfoTypes.SEND_CAR_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            sendCar: {
                ...state.sendCar,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.SEND_CAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            sendCar: {
                ...state.sendCar,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.SEND_CAR_WAITING]: (state, action) => {
        return {
            ...state,
            sendCar: {
                ...state.sendCar,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.SEND_CAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            sendCar: {
                ...state.sendCar,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.SEND_CAR_SERVICEERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            sendCar: {
                ...state.sendCar,
                isResultStatus: 3,
                isExecStatus: 2,
                serviceErrorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_SEND_CAR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            sendCar: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceErrorMsg: ''
            }
        }
    }
}, initialState)

