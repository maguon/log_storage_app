import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    data: {
        recordList: [],
        imageList: [],
        car: {},
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
    appendCarImage: {
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
        console.log('data',data)
        return {
            ...state,
            // data: {
            //     ...state.data,
            //     car: {
            //         ...state.data.car,
            //         ...data
            //     }
            // },
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
        const { payload: { data } } = action
        return {
            ...state,
            updateCarInfo: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                serviceErrorMsg: ''
            }
        }
    },


    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                data: {
                    ...state.getCarInfo.data,
                    imageList: [...state.getCarInfo.data.imageList, data]
                }
            },
            appendCarImage: {
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            appendCarImage: {
                ...state.appendCarImage,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_WAITING]: (state, action) => {
        return {
            ...state,
            appendCarImage: {
                ...state.appendCarImage,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            appendCarImage: {
                ...state.appendCarImage,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_APPEND_CAR_IMAGE]: (state, action) => {
        return {
            ...state,
            appendCarImage: {
                ...state.appendCarImage,
                isExecStatus: 0
            }
        }
    },







    [actionTypes.carInfoTypes.MOVE_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
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
    [actionTypes.carInfoTypes.RESET_MOVE_CAR]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isExecStatus: 0
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
    [actionTypes.carInfoTypes.RESET_DELETE_IMAGE]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            delImage: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: ''
            }
        }
    },


    [actionTypes.carInfoTypes.EXPORT_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                data: {
                    ...state.getCarInfo.data,
                    car: {
                        ...state.getCarInfo.data.car,
                        rel_status: 0
                    }
                }
            },
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
    [actionTypes.carInfoTypes.RESET_EXPORT_CAR]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isExecStatus: 0
            }
        }
    },
}, initialState)

