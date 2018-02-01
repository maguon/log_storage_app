import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    exportCar: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.carInfoTypes.put_exportCar_success]: (state, action) => {
        const { payload: { damageId } } = action
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
    }
}, initialState)