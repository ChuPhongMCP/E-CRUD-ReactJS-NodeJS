import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const miniSearchProductReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.MINI_SEARCH_PRODUCTS:
            return { ...state, isLoading: true };

        case ActionTypes.MINI_SEARCH_PRODUCTS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.MINI_SEARCH_PRODUCTS_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_MINI_SEARCH_PRODUCTS:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default miniSearchProductReducer;
