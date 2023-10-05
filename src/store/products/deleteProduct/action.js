import * as ActionTypes from './actionTypes';

export const actionDeleteProduct = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.DELETE_PRODUCTS,
  payload //điều kiện nhận vào để get data
});

export const actionDeleteProductSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.DELETE_PRODUCTS_SUCCESS,
  payload, //data
});

export const actionDeleteProductFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.DELETE_PRODUCTS_FAILED,
  payload, //data
});

export const actionResetDeleteProduct = () => ({ //lấy data từ api thất bại
  type: ActionTypes.RESET_DELETE_PRODUCTS,
});
