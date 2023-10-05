import product from 'api/products/createProduct';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionCreateProductFailed, actionCreateProductSuccess } from './action';

function* createProduct(action) {
  try {
    const response = yield product.createProduct(action.payload);

    yield put(actionCreateProductSuccess(response));
  } catch (error) {
    yield put(actionCreateProductFailed());
     
  }
}

export default function* createProductsSaga() {
  yield takeLeading(ActionTypes.CREATE_PRODUCTS, createProduct);
};
