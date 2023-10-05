import category from 'api/categories/createCategory';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionCreateCategorySuccess, actionCreateCategoryFailed } from './action';

function* createCategory(action) {
  try {
    const response = yield category.createCategory(action.payload);

    yield put(actionCreateCategorySuccess(response));
  } catch (error) {
    yield put(actionCreateCategoryFailed());
  }
}

export default function* createCategorysSaga() {
  yield takeLeading(ActionTypes.CREATE_CATEGORY, createCategory);
};
