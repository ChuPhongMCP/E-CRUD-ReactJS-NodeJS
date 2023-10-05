import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const createCategoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_CATEGORY:
            return { ...state, isLoading: true };

        case ActionTypes.CREATE_CATEGORY_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.CREATE_CATEGORY_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_CREATE_CATEGORY:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default createCategoryReducer;
