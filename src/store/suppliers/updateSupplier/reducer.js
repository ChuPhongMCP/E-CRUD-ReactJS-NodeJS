import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const updateSupplierReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_SUPPLIER:
            return { ...state, isLoading: true };

        case ActionTypes.UPDATE_SUPPLIER_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.UPDATE_SUPPLIER_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_UPDATE_SUPPLIER:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default updateSupplierReducer;
