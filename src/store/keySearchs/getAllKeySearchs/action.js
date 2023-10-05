import * as ActionTypes from './actionTypes';

export const actionGetAllKeySearch = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.GET_ALL_KEYSEARCH,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllKeySearchSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_KEYSEARCH_SUCCESS,
  payload, //data
});

export const actionGetAllKeySearchFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_KEYSEARCH_FAILED,
  payload, //data
});

export const actionResetGetAllKeySearch = () => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_KEYSEARCH_FAILED,
});
