import * as ActionTypes from './actionTypes';

export const actionGetAllSupplier = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.GET_ALL_SUPPLIER,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllSupplierSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_SUPPLIER_SUCCESS,
  payload, //data
});

export const actionGetAllSupplierFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_SUPPLIER_FAILED,
  payload, //data
});
