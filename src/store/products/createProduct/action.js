import * as ActionTypes from './actionTypes';

export const actionCreateProduct = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.CREATE_PRODUCTS,
  payload
});

export const actionCreateProductSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.CREATE_PRODUCTS_SUCCESS,
  payload, //data
});

export const actionCreateProductFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.CREATE_PRODUCTS_FAILED,
  payload, //data
});

export const actionResetCreateProduct = () => ({ 
  type: ActionTypes.RESET_CREATE_PRODUCTS,
});
