import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const createProductReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_PRODUCTS:
            return { ...state, isLoading: true };

        case ActionTypes.CREATE_PRODUCTS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.CREATE_PRODUCTS_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_CREATE_PRODUCTS:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default createProductReducer;
