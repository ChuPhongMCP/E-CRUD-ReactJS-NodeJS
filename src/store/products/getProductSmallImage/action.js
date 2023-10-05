import * as ActionTypes from './actionTypes';

export const actionGetProductSmallImage = (payload) => ({
  type: ActionTypes.GET_PRODUCT_SMALL_IMAGE,
  payload //điều kiện nhận vào để get data
});

export const actionGetProductSmallImageSuccess = (payload) => ({
  type: ActionTypes.GET_PRODUCT_SMALL_IMAGE_SUCCESS,
  payload, //data
});

export const actionGetProductSmallImageFailed = (payload) => ({
  type: ActionTypes.GET_PRODUCT_SMALL_IMAGE_FAILED,
  payload, //data
});

export const actionResetGetProductSmallImage = () => ({
  type: ActionTypes.RESET_GET_PRODUCT_SMALL_IMAGE,
});
