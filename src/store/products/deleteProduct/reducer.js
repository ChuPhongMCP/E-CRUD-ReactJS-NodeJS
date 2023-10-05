import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const deleteProductReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_PRODUCTS:
            return { ...state, isLoading: true };

        case ActionTypes.DELETE_PRODUCTS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.DELETE_PRODUCTS_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_DELETE_PRODUCTS:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default deleteProductReducer;
