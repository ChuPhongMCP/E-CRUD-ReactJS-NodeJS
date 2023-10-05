import * as ActionTypes from './actionTypes';

export const actionMiniSearchProduct = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.MINI_SEARCH_PRODUCTS,
  payload //điều kiện nhận vào để get data
});

export const actionMiniSearchProductSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.MINI_SEARCH_PRODUCTS_SUCCESS,
  payload, //data
});

export const actionMiniSearchProductFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.MINI_SEARCH_PRODUCTS_FAILED,
  payload, //data
});

export const actionResetMiniSearchProduct = () => ({
  type: ActionTypes.RESET_MINI_SEARCH_PRODUCTS,
});
