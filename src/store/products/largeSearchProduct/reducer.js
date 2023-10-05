import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const largeSearchProductReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.LARGE_SEARCH_PRODUCTS:
            return { ...state, isLoading: true };

        case ActionTypes.LARGE_SEARCH_PRODUCTS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.LARGE_SEARCH_PRODUCTS_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_LARGE_SEARCH_PRODUCTS:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default largeSearchProductReducer;
