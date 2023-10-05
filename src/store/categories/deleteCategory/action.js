import * as ActionTypes from './actionTypes';

export const actionDeleteCategory = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.DELETE_CATEGORY,
  payload //điều kiện nhận vào để get data
});

export const actionDeleteCategorySuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.DELETE_CATEGORY_SUCCESS,
  payload, //data
});

export const actionDeleteCategoryFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.DELETE_CATEGORY_FAILED,
  payload, //data
});

export const actionResetDeleteCategory = () => ({ //lấy data từ api thất bại
  type: ActionTypes.RESET_DELETE_CATEGORY,
});
