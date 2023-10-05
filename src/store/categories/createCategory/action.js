import * as ActionTypes from './actionTypes';

export const actionCreateCategory = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.CREATE_CATEGORY,
  payload
});

export const actionCreateCategorySuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.CREATE_CATEGORY_SUCCESS,
  payload, //data
});

export const actionCreateCategoryFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.CREATE_CATEGORY_FAILED,
  payload, //data
});

export const actionResetCreateCategory = () => ({ 
  type: ActionTypes.RESET_CREATE_CATEGORY,
});
