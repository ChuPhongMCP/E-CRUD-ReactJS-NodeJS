import login from 'api/login/loginApi';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionLoginSuccess, actionLoginFailed } from './action';

function* pushLogin(action) {
  try {
    const response = yield login.PushLogin(action.payload);

    yield put(actionLoginSuccess(response));
  } catch (error) {
    yield put(actionLoginFailed());
  }
}

export default function* loginSaga() {
  yield takeLeading(ActionTypes.CALL_LOGIN, pushLogin);
};
