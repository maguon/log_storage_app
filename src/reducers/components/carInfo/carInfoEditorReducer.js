import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    updateCarInfo: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.carInfoEditorTypes.update_carInfo_success]: (state, action) => {
        return {
            ...state,
            updateCarInfo: {
                ...initialState.updateCarInfo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carInfoEditorTypes.update_carInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateCarInfo: {
                ...initialState.updateCarInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carInfoEditorTypes.update_carInfo_waiting]: (state, action) => {
        return {
            ...state,
            updateCarInfo: {
                ...initialState.updateCarInfo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carInfoEditorTypes.update_carInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateCarInfo: {
                ...initialState.updateCarInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

