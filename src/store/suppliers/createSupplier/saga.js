import supplier from 'api/suppliers/createSupplier';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionCreateSupplierSuccess, actionCreateSupplierFailed } from './action';

function* createSupplier(action) {
  try {
    const response = yield supplier.createSupplier(action.payload);

    yield put(actionCreateSupplierSuccess(response));
  } catch (error) {
    yield put(actionCreateSupplierFailed());
     
  }
}

export default function* createSuppliersSaga() {
  yield takeLeading(ActionTypes.CREATE_SUPPLIER, createSupplier);
};
