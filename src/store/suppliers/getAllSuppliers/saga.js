import supplier from 'api/suppliers/getAllSuppliers';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllSupplierSuccess, actionGetAllSupplierFailed } from './action';

function* getAllSupplier(action) {
    try {
      const response = yield supplier.getAllSuppliers(action.payload);
  
      yield put(actionGetAllSupplierSuccess(response));
    } catch (error) {
      yield put(actionGetAllSupplierFailed());
       
    }
  }

  export default function* supplierSaga() {
    yield takeLeading(ActionTypes.GET_ALL_SUPPLIER, getAllSupplier);
  };
