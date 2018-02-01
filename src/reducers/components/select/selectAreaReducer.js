import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        areaList: []
    },
    getAreaList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.selectAreaActionTypes.get_areaList_success]: (state, action) => {
        const { payload: { areaList } } = action
        return {
            ...state,
            data: {
                areaList
            },
            getAreaList: {
                ...initialState.getAreaList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectAreaActionTypes.get_areaList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAreaList: {
                ...initialState.getAreaList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectAreaActionTypes.get_areaList_waiting]: (state, action) => {
        return {
            ...state,
            getAreaList: {
                ...initialState.getAreaList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectAreaActionTypes.get_areaList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAreaList: {
                ...initialState.getAreaList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

