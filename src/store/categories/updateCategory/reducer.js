import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const updateCategoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_CATEGORY:
            return { ...state, isLoading: true };

        case ActionTypes.UPDATE_CATEGORY_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.UPDATE_CATEGORY_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_UPDATE_CATEGORY:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default updateCategoryReducer;
