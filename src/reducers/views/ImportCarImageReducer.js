import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        imageList: [],
        recordId
    },
    pushCarImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.importCarImageTypes.import_carImage_success]: (state, action) => {
        const { payload: { imageList,recordId } } = action
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList.map(item => { return { url: item } })]
            },
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.importCarImageTypes.upload_ImageAtCarInfo_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg,recordId } } = action
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList]
            },
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.importCarImageTypes.upload_ImageAtCarInfo_waiting]: (state, action) => {
        return {
            ...state,
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.importCarImageTypes.upload_ImageAtCarInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)