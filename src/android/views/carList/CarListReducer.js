import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        carList: [],
        isComplete: false
    },
    getCarListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getCarList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.carListTypes.get_carList_success]: (state, action) => {
        const { payload: { carList, isComplete } } = action
        return {
            ...state,
            data: {
                carList,
                isComplete
            },
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carListTypes.get_carList_waiting]: (state, action) => {
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.carListTypes.get_carList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carListTypes.get_carList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.carListTypes.get_carListMore_success]: (state, action) => {
        const { payload: { carList, isComplete } } = action
        return {
            ...state,
            data: {
                carList: [...state.data.carList, ...carList],
                isComplete
            },
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carListTypes.get_carListMore_waiting]: (state, action) => {
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.carListTypes.get_carListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carListTypes.get_carListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.carListTypes.change_carListCarInfo]: (state, action) => {
        const { payload: { changeField } } = action
        return {
            ...state,
            data: {
                carList: state.data.carList.map(item => {
                    if (item.vin == changeField.vin) {
                        return {
                            ...item,
                            ...changeField
                        }
                    } else {
                        return item
                    }
                })
            }
        }
    }

}, initialState)