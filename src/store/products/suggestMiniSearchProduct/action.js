import * as ActionTypes from './actionTypes';

export const actionSuggestMiniSearchProduct = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.SUGGEST_MINI_SEARCH_PRODUCTS,
  payload //điều kiện nhận vào để get data
});

export const actionSuggestMiniSearchProductSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.SUGGEST_MINI_SEARCH_PRODUCTS_SUCCESS,
  payload, //data
});

export const actionSuggestMiniSearchProductFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.SUGGEST_MINI_SEARCH_PRODUCTS_FAILED,
  payload, //data
});

export const actionResetSuggestMiniSearchProduct = () => ({
  type: ActionTypes.RESET_SUGGEST_MINI_SEARCH_PRODUCTS,
});
