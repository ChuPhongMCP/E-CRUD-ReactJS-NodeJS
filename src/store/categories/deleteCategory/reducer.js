import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const deleteCategoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_CATEGORY:
            return { ...state, isLoading: true };

        case ActionTypes.DELETE_CATEGORY_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.DELETE_CATEGORY_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_DELETE_CATEGORY:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default deleteCategoryReducer;
