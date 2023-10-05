import product from 'api/products/getProductImage';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetProductImageFailed, actionGetProductImageSuccess } from './action';

function* getProductImage(action) {
  try {
    const response = yield product.getProductImage(action.payload);

    yield put(actionGetProductImageSuccess(response));
  } catch (error) {
    yield put(actionGetProductImageFailed(error));
     
  }
}

export default function* getProductImageSaga() {
  yield takeLeading(ActionTypes.GET_PRODUCT_IMAGE, getProductImage);
};
