import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        carImageList: []
    },
    getCarImageList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    uploadCarImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.imageListForCarInfoTypes.get_carImageList_success]: (state, action) => {
        const { payload: { carImageList } } = action
        return {
            ...state,
            data: {
                carImageList
            },
            getCarImageList: {
                ...initialState.getCarImageList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.imageListForCarInfoTypes.get_carImageList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarImageList: {
                ...initialState.getCarImageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.imageListForCarInfoTypes.get_carImageList_waiting]: (state, action) => {
        return {
            ...state,
            getCarImageList: {
                ...initialState.getCarImageList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.imageListForCarInfoTypes.get_carImageList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarImageList: {
                ...initialState.getCarImageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_success]: (state, action) => {
        const { payload: { carImageList } } = action
        return {
            ...state,
            data: {
                carImageList: [...state.data.carImageList, ...carImageList.map(item => { return { url: item } })]
            },
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_partSuccess]: (state, action) => {
        const { payload: { carImageList, failedMsg } } = action
        return {
            ...state,
            data: {
                carImageList: [...state.data.carImageList, ...carImageList]
            },
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_waiting]: (state, action) => {
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.imageListForCarInfoTypes.upload_ImageAtCarInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadCarImage: {
                ...initialState.uploadCarImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)