import * as ActionTypes from './actionTypes';

export const actionGetAllCategory = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.GET_ALL_CATEGORY,
  payload, //điều kiện nhận vào để get data
});

export const actionGetAllCategorySuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_ALL_CATEGORY_SUCCESS,
  payload, //data
});

export const actionGetAllCategoryFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_ALL_CATEGORY_FAILED,
  payload, //data
});
