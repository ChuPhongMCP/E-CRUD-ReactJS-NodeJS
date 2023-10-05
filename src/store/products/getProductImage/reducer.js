import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const getProductImageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_PRODUCT_IMAGE:
            return { ...state, isLoading: true };

        case ActionTypes.GET_PRODUCT_IMAGE_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_PRODUCT_IMAGE_FAILED:
            return { ...state, payload: action.payload, isLoading: true };

        case ActionTypes.RESET_GET_PRODUCT_IMAGE:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default getProductImageReducer;
