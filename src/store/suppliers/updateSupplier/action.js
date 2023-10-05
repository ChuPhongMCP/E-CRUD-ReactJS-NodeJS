import * as ActionTypes from './actionTypes';

export const actionUpdateSupplier = (productId, updatedValues) => ({ //lấy data profile từ api
  type: ActionTypes.UPDATE_SUPPLIER,
  payload: { productId, updatedValues }, //điều kiện nhận vào để get data
});

export const actionUpdateSupplierSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.UPDATE_SUPPLIER_SUCCESS,
  payload, //data
});

export const actionUpdateSupplierFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.UPDATE_SUPPLIER_FAILED,
  payload, //data
});

export const actionResetUpdateSupplier = () => ({ //lấy data từ api thất bại
  type: ActionTypes.RESET_UPDATE_SUPPLIER,
});
