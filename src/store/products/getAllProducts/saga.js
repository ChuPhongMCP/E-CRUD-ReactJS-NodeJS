import products from 'api/products/getAllProducts';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllProductsSuccess, actionGetAllProductsFailed } from './action';

function* getAllProducts(action) {
    try {
      const response = yield products.getAllProducts(action.payload);
  
      yield put(actionGetAllProductsSuccess(response));
    } catch (error) {
      yield put(actionGetAllProductsFailed());
       
    }
  }

  export default function* productsSaga() {
    yield takeLeading(ActionTypes.GET_ALL_PRODUCTS, getAllProducts);
  };
