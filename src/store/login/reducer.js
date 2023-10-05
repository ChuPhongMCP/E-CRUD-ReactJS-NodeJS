
import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {},
};

const LoginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CALL_LOGIN:
            return { ...state, isLoading: true };

        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.LOGIN_FAILED:
            return { ...state, isLoading: false };

        case ActionTypes.RESET_LOGIN:
            return { ...state, isLoading: false, payload: {} };

        default:
            return state;
    }
};

export default LoginReducer;
