import * as ActionTypes from './actionTypes';

export const actionGetAllProducts = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.GET_ALL_PRODUCTS,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllProductsSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_PRODUCTS_SUCCESS,
  payload, //data
});

export const actionGetAllProductsFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_PRODUCTS_FAILED,
  payload, //data
});
