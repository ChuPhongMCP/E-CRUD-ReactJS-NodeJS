import * as ActionTypes from './actionTypes';

export const actionLargeSearchProduct = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.LARGE_SEARCH_PRODUCTS,
  payload //điều kiện nhận vào để get data
});

export const actionLargeSearchProductSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.LARGE_SEARCH_PRODUCTS_SUCCESS,
  payload, //data
});

export const actionLargeSearchProductFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.LARGE_SEARCH_PRODUCTS_FAILED,
  payload, //data
});

export const actionResetLargeSearchProduct = () => ({
  type: ActionTypes.RESET_LARGE_SEARCH_PRODUCTS,
});
