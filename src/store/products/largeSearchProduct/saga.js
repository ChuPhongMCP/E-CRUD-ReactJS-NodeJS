import product from 'api/products/largeSearchProduct';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionLargeSearchProductSuccess, actionLargeSearchProductFailed } from './action';

function* largeSearchProduct(action) {
    try {
      const response = yield product.largeSearchProduct(action.payload);
        
      yield put(actionLargeSearchProductSuccess(response));
    } catch (error) {
      yield put(actionLargeSearchProductFailed());
       
    }
  }

  export default function* largeSearchProductsSaga() {
    yield takeLeading(ActionTypes.LARGE_SEARCH_PRODUCTS, largeSearchProduct);
  };
