import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const suggestMiniSearchProductReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.SUGGEST_MINI_SEARCH_PRODUCTS:
            return { ...state, isLoading: true };

        case ActionTypes.SUGGEST_MINI_SEARCH_PRODUCTS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.SUGGEST_MINI_SEARCH_PRODUCTS_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_SUGGEST_MINI_SEARCH_PRODUCTS:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default suggestMiniSearchProductReducer;
