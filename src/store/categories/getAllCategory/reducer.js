import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const categoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_CATEGORY:
            return { ...state, isLoading: true };

        case ActionTypes.GET_ALL_CATEGORY_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_ALL_CATEGORY_FAILED:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};

export default categoryReducer;
