import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const deleteSupplierReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.DELETE_SUPPLIER:
            return { ...state, isLoading: true };

        case ActionTypes.DELETE_SUPPLIER_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.DELETE_SUPPLIER_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_DELETE_SUPPLIER:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default deleteSupplierReducer;
