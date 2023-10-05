import category from 'api/categories/updateCategory';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionUpdateCategorySuccess, actionUpdateCategoryFailed } from './action';

function* updateCategory(action) {
    try {
      const response = yield category.updateCategory(action.payload);
  
      yield put(actionUpdateCategorySuccess(response));
    } catch (error) {
      yield put(actionUpdateCategoryFailed());
    }
  }

  export default function* updateCategorysSaga() {
    yield takeLeading(ActionTypes.UPDATE_CATEGORY, updateCategory);
  };
