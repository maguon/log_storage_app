import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        truckList: []
    },
    getTruckList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }

}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.selectTruckActionTypes.get_truckList_success]: (state, action) => {
        const { payload: { truckList } } = action
        return {
            ...state,
            data: {
                truckList
            },
            getTruckList: {
                ...initialState.getTruckList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectTruckActionTypes.get_truckList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTruckList: {
                ...initialState.getTruckList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectTruckActionTypes.get_truckList_waiting]: (state, action) => {
        return {
            ...state,
            getTruckList: {
                ...initialState.getTruckList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectTruckActionTypes.get_truckList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTruckList: {
                ...initialState.getTruckList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

