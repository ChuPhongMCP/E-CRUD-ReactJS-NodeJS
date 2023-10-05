import * as ActionTypes from './actionTypes';

export const actionGetProfileImage = (payload) => ({ //lấy data profile từ api
  type: ActionTypes.GET_PROFILE_IMAGE,
  payload,
});

export const actionGetProfileImageSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_PROFILE_IMAGE_SUCCESS,
  payload, //data
});

export const actionGetProfileImageFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_PROFILE_IMAGE_FAILED,
  payload, //data
});

export const actionResetGetProfileImage = () => ({ //lấy data từ api thất bại
  type: ActionTypes.RESET_GET_PROFILE_IMAGE,
});
