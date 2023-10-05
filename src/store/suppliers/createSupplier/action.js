import * as ActionTypes from './actionTypes';

export const actionCreateSupplier = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.CREATE_SUPPLIER,
  payload
});

export const actionCreateSupplierSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.CREATE_SUPPLIER_SUCCESS,
  payload, //data
});

export const actionCreateSupplierFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.CREATE_SUPPLIER_FAILED,
  payload, //data
});

export const actionResetCreateSupplier = () => ({ 
  type: ActionTypes.RESET_CREATE_SUPPLIER,
});
