import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const getProductDetailReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_PRODUCT_DETAIL:
            return { ...state, isLoading: true };

        case ActionTypes.GET_PRODUCT_DETAIL_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_PRODUCT_DETAIL_FAILED:
            return { ...state, isLoading: true };

        case ActionTypes.RESET_GET_PRODUCT_DETAIL:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default getProductDetailReducer;
