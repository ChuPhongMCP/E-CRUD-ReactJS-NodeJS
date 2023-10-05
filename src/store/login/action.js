import * as ActionTypes from './actionTypes';

export const actionLogin = (payload) => ({
    type: ActionTypes.CALL_LOGIN,
    payload,
});

export const actionLoginSuccess = (payload) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload, //data
});

export const actionLoginFailed = () => ({
    type: ActionTypes.LOGIN_FAILED,
});

export const actionResetLogin = () => ({
    type: ActionTypes.RESET_LOGIN,
});