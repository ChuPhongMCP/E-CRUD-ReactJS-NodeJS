import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const keySearchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_KEYSEARCH:
            return { ...state, isLoading: true };

        case ActionTypes.GET_ALL_KEYSEARCH_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_ALL_KEYSEARCH_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_GET_ALL_KEYSEARCH:
            return { ...state, isLoading: false, payload: {}, };

        default:
            return state;
    }
};

export default keySearchReducer;
