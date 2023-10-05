import category from 'api/categories/deleteCategory';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionDeleteCategoryFailed, actionDeleteCategorySuccess } from './action';

function* deleteCategory(action) {
    try {
      const response = yield category.deleteCategory(action.payload);
  
      yield put(actionDeleteCategorySuccess(response));
    } catch (error) {
      yield put(actionDeleteCategoryFailed());
    }
  }

  export default function* deleteCategorysSaga() {
    yield takeLeading(ActionTypes.DELETE_CATEGORY, deleteCategory);
  };
