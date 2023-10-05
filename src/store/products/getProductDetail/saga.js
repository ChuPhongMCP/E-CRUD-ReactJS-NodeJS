import product from 'api/products/productDetail';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetProductDetailFailed, actionGetProductDetailSuccess } from './action';

function* getProductDetail(action) {
    try {
      const response = yield product.getProductDetail(action.payload);
  
      yield put(actionGetProductDetailSuccess(response));
    } catch (error) {
      yield put(actionGetProductDetailFailed());
       
    }
  }

  export default function* getProductDetailsSaga() {
    yield takeLeading(ActionTypes.GET_PRODUCT_DETAIL, getProductDetail);
  };
