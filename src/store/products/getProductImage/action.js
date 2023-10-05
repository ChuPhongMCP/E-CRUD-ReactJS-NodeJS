import * as ActionTypes from './actionTypes';

export const actionGetProductImage = (payload) => ({
  type: ActionTypes.GET_PRODUCT_IMAGE,
  payload //điều kiện nhận vào để get data
});

export const actionGetProductImageSuccess = (payload) => ({
  type: ActionTypes.GET_PRODUCT_IMAGE_SUCCESS,
  payload, //data
});

export const actionGetProductImageFailed = (payload) => ({
  type: ActionTypes.GET_PRODUCT_IMAGE_FAILED,
  payload, //data
});

export const actionResetGetProductImage = () => ({
  type: ActionTypes.RESET_GET_PRODUCT_IMAGE,
});
