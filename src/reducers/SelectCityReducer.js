import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    citys: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            cityList: []
        }
    }
}

export default handleActions({
    [actionTypes.selectCityTypes.GET_CITYS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            citys: {
                ...state.citys,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    cityList: data
                }
            }
        }
    },
    [actionTypes.selectCityTypes.GET_CITYS_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            citys: {
                ...state.citys,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.selectCityTypes.GET_CITYS_WAITING]: (state, action) => {
        return {
            citys: {
                ...state.citys,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.selectCityTypes.GET_CITYS_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            citys: {
                ...state.citys,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    }
}, initialState)

