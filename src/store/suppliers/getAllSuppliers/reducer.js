import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const supplierReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_SUPPLIER:
            return { ...state, isLoading: true };

        case ActionTypes.GET_ALL_SUPPLIER_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_ALL_SUPPLIER_FAILED:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};

export default supplierReducer;
