import category from 'api/categories/getAllCategories';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllCategorySuccess, actionGetAllCategoryFailed } from './action';

function* getAllCategory(action) {
    try {
      const response = yield category.getAllCategories(action.payload);
  
      yield put(actionGetAllCategorySuccess(response));
    } catch (error) {
      yield put(actionGetAllCategoryFailed());
    }
  }

  export default function* categorySaga() {
    yield takeLeading(ActionTypes.GET_ALL_CATEGORY, getAllCategory);
  };
