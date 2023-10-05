import supplier from 'api/suppliers/updateSupplier';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionUpdateSupplierSuccess, actionUpdateSupplierFailed } from './action';

function* updateSupplier(action) {
    try {
      const response = yield supplier.updateSupplier(action.payload);
  
      yield put(actionUpdateSupplierSuccess(response));
    } catch (error) {
      yield put(actionUpdateSupplierFailed());
       
    }
  }

  export default function* updateSuppliersSaga() {
    yield takeLeading(ActionTypes.UPDATE_SUPPLIER, updateSupplier);
  };
