import product from 'api/products/updateProduct';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionUpdateProductSuccess, actionUpdateProductFailed } from './action';

function* updateProduct(action) {
    try {
      const response = yield product.updateProduct(action.payload);
  
      yield put(actionUpdateProductSuccess(response));
    } catch (error) {
      yield put(actionUpdateProductFailed());
       
    }
  }

  export default function* updateProductsSaga() {
    yield takeLeading(ActionTypes.UPDATE_PRODUCTS, updateProduct);
  };
