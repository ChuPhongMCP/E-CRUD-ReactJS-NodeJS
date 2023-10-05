import product from 'api/products/getProductSmallImage';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetProductSmallImageFailed, actionGetProductSmallImageSuccess } from './action';

function* getProductSmallImage(action) {
  try {
    const response = yield product.getProductSmallImage(action.payload);

    yield put(actionGetProductSmallImageSuccess(response));
  } catch (error) {
    yield put(actionGetProductSmallImageFailed(error));
     
  }
}

export default function* getProductSmallImageSaga() {
  yield takeLeading(ActionTypes.GET_PRODUCT_SMALL_IMAGE, getProductSmallImage);
};
