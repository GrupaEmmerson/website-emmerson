import {GET_LOCATION, GET_VIEWPORT} from './types';

export function setLocation(location) {
    return function (dispatch) {
        dispatch({type: GET_LOCATION, payload: location});
    }
}

export function setViewport(location) {
    return function (dispatch) {
        dispatch({type: GET_VIEWPORT, payload: location});
    }
}