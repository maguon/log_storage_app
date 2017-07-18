import * as actionTypes from './actionTypes'

export const changeScene = (param) => (dispatch) => {
    dispatch({ type: actionTypes.sceneTypes.CHANGE_SCENE, payload: { data: param } })
}