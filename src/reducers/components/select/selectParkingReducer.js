import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        parkingList: []
    },
    getParkingList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.selectParkingActionTypes.get_parkingList_success]: (state, action) => {
        const { payload: { parkingList } } = action
        return {
            ...state,
            data: {
                parkingList
            },
            getParkingList: {
                ...initialState.getParkingList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectParkingActionTypes.get_parkingList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getParkingList: {
                ...initialState.getParkingList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectParkingActionTypes.get_parkingList_waiting]: (state, action) => {
        return {
            ...state,
            getParkingList: {
                ...initialState.getParkingList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectParkingActionTypes.get_parkingList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getParkingList: {
                ...initialState.getParkingList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)