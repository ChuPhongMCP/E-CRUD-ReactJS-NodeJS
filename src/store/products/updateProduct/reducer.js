import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const updateProductReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_PRODUCTS:
            return { ...state, isLoading: true };

        case ActionTypes.UPDATE_PRODUCTS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.UPDATE_PRODUCTS_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_UPDATE_PRODUCTS:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default updateProductReducer;
