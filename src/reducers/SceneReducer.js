import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    selectedScene: ''
}

export default handleActions({
    [actionTypes.sceneTypes.CHANGE_SCENE]: (state, action) => {
        const { payload: { data } } = action
        return {
            selectedScene: data
        }
    }
},initialState)