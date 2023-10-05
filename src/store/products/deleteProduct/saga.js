import product from 'api/products/deleteProduct';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionDeleteProductFailed, actionDeleteProductSuccess } from './action';

function* deleteProduct(action) {
    try {
      const response = yield product.deleteProduct(action.payload);
  
      yield put(actionDeleteProductSuccess(response));
    } catch (error) {
      yield put(actionDeleteProductFailed());
       
    }
  }

  export default function* deleteProductsSaga() {
    yield takeLeading(ActionTypes.DELETE_PRODUCTS, deleteProduct);
  };
