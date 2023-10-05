import * as ActionTypes from './actionTypes';

export const actionGetProductDetail = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.GET_PRODUCT_DETAIL,
  payload //điều kiện nhận vào để get data
});

export const actionGetProductDetailSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_PRODUCT_DETAIL_SUCCESS,
  payload, //data
});

export const actionGetProductDetailFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_PRODUCT_DETAIL_FAILED,
  payload, //data
});

export const actionResetGetProductDetail = () => ({ //lấy data từ api thất bại
  type: ActionTypes.RESET_GET_PRODUCT_DETAIL,
});
