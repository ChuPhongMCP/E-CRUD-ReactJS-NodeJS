import * as ActionTypes from './actionTypes';

export const actionUpdateCategory = (productId, updatedValues) => ({ //lấy data profile từ api
  type: ActionTypes.UPDATE_CATEGORY,
  payload: { productId, updatedValues }, //điều kiện nhận vào để get data
});

export const actionUpdateCategorySuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.UPDATE_CATEGORY_SUCCESS,
  payload, //data
});

export const actionUpdateCategoryFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.UPDATE_CATEGORY_FAILED,
  payload, //data
});

export const actionResetUpdateCategory = () => ({ //lấy data từ api thất bại
  type: ActionTypes.RESET_UPDATE_CATEGORY,
});
