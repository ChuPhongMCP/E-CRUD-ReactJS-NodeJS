import product from 'api/products/miniSearchProduct';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionMiniSearchProductSuccess, actionMiniSearchProductFailed } from './action';

function* miniSearchProduct(action) {
    try {
      const response = yield product.miniSearchProduct(action.payload);
  
      yield put(actionMiniSearchProductSuccess(response));
    } catch (error) {
      yield put(actionMiniSearchProductFailed());
       
    }
  }

  export default function* miniSearchProductsSaga() {
    yield takeLeading(ActionTypes.MINI_SEARCH_PRODUCTS, miniSearchProduct);
  };
