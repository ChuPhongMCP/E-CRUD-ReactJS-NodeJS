import product from 'api/products/suggestMiniSearchProduct';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionSuggestMiniSearchProductSuccess, actionSuggestMiniSearchProductFailed } from './action';

function* suggestMiniSearchProduct(action) {
  try {
    const response = yield product.suggestMiniSearchProduct(action.payload);

    if (response) {
      yield put(actionSuggestMiniSearchProductSuccess(response));
    } else {
      yield put(actionSuggestMiniSearchProductFailed('No data found')); // Handle failure appropriately
    }
  } catch (error) {
    yield put(actionSuggestMiniSearchProductFailed());
     
  }
}

export default function* suggestMiniSearchProductsSaga() {
  yield takeLeading(ActionTypes.SUGGEST_MINI_SEARCH_PRODUCTS, suggestMiniSearchProduct);
};
