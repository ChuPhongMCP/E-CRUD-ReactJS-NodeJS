import * as ActionTypes from './actionTypes';

export const actionDeleteSupplier = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.DELETE_SUPPLIER,
  payload //điều kiện nhận vào để get data
});

export const actionDeleteSupplierSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.DELETE_SUPPLIER_SUCCESS,
  payload, //data
});

export const actionDeleteSupplierFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.DELETE_SUPPLIER_FAILED,
  payload, //data
});

export const actionResetDeleteSupplier = () => ({ //lấy data từ api thất bại
  type: ActionTypes.RESET_DELETE_SUPPLIER,
});
