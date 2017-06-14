import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    selectedTab: 'home' //carList,storageList,setting,
}

export default handleActions({
    [actionTypes.mainRootTypes.CHANGE_SELECTED_TAB]: (state, action) => {
        const { payload: { data } } = action
        return {
            selectedTab: data
        }
    }
}, initialState)

