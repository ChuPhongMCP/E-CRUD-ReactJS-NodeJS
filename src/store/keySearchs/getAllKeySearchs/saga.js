import keySearch from 'api/keySearch/getAllKeySearch';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetAllKeySearchSuccess, actionGetAllKeySearchFailed } from './action';

function* getAllKeySearch(action) {
    try {
      const response = yield keySearch.getAllKeySearch(action.payload);
  
      yield put(actionGetAllKeySearchSuccess(response));
    } catch (error) {
      yield put(actionGetAllKeySearchFailed());
    }
  }

  export default function* keySearchSaga() {
    yield takeLeading(ActionTypes.GET_ALL_KEYSEARCH, getAllKeySearch);
  };
