import * as ActionTypes from './actionTypes';

export const actionUpdateProduct = (productId, updatedValues) => ({ //lấy data profile từ api
  type: ActionTypes.UPDATE_PRODUCTS,
  payload: { productId, updatedValues }, //điều kiện nhận vào để get data
});

export const actionUpdateProductSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.UPDATE_PRODUCTS_SUCCESS,
  payload, //data
});

export const actionUpdateProductFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.UPDATE_PRODUCTS_FAILED,
  payload, //data
});

export const actionResetUpdateProduct = () => ({ //lấy data từ api thất bại
  type: ActionTypes.RESET_UPDATE_PRODUCTS,
});
