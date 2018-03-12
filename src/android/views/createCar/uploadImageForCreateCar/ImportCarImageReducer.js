import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        imageList: [],
        recordId:0
    },
    pushCarImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    delImage:{
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
                imageList: [...state.data.imageList, ...imageList.map(item => { return { url: item } })],
                recordId
            },
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.importCarImageTypes.import_carImage_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg,recordId } } = action
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList],
                recordId
            },
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [actionTypes.importCarImageTypes.import_carImage_waiting]: (state, action) => {
        return {
            ...state,
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.importCarImageTypes.import_carImage_failed]: (state, action) => {
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
    [actionTypes.importCarImageTypes.import_carImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            pushCarImage: {
                ...initialState.pushCarImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.importCarImageTypes.del_importCarImage_success]: (state, action) => {
        const { payload: { imageurl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList: state.data.imageList.filter(item => {
                    return item.url != imageurl
                })
            },
            delImage: {
                ...initialState.delImage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.importCarImageTypes.del_importCarImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.importCarImageTypes.del_importCarImage_waiting]: (state, action) => {
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.importCarImageTypes.del_importCarImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            delImage: {
                ...initialState.delImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)