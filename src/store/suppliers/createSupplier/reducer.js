import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const createSupplierReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_SUPPLIER:
            return { ...state, isLoading: true };

        case ActionTypes.CREATE_SUPPLIER_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.CREATE_SUPPLIER_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_CREATE_SUPPLIER:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default createSupplierReducer;
