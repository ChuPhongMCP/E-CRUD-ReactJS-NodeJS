import supplier from 'api/suppliers/deleteSupplier';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionDeleteSupplierFailed, actionDeleteSupplierSuccess } from './action';

function* deleteSupplier(action) {
    try {
      const response = yield supplier.deleteSupplier(action.payload);
  
      yield put(actionDeleteSupplierSuccess(response));
    } catch (error) {
      yield put(actionDeleteSupplierFailed());
       
    }
  }

  export default function* deleteSuppliersSaga() {
    yield takeLeading(ActionTypes.DELETE_SUPPLIER, deleteSupplier);
  };
