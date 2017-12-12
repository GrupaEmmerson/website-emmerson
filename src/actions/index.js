import {GET_LOCATION, GET_VIEWPORT, GET_OFFERS, IS_LOADED} from './types';

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

export function setOffers(offers) {
    return function (dispatch) {
        dispatch({type: GET_OFFERS, payload: offers});
    }
}

export function setIsLoaded(isLoaded) {
    return function (dispatch) {
        dispatch({type: IS_LOADED, payload: isLoaded});
    }
}