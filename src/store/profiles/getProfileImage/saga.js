import profile from 'api/getProfile/getProfileImage';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetProfileImageFailed, actionGetProfileImageSuccess } from './action';

function* getProfileImage(payload) {
    try {
      const response = yield profile.getProfileImage(payload.payload); //gọi hàm lấy data profile trong api/profileApi
  
      yield put(actionGetProfileImageSuccess(response)); //nếu call api lấy thành công, gọi action actionGetProfileImageSuccess và truyền vào response(data) đã get để lưu vào store
    } catch (error) {
      yield put(actionGetProfileImageFailed()); //nếu call api thất bại gọi action actionGetProfileImageFailed để dừng trạng thái loading và ném lỗi
    }
  }

  export default function* profileSaga() {
    yield takeLeading(ActionTypes.GET_PROFILE_IMAGE, getProfileImage); //gọi hàm getProfileImage() ở trên nếu nghe thấy lệnh ActionTypes.GET_MY_PROFILE từ 1 component nào đó
  };
