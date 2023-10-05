import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    profile: {},
};

const getProfileImageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_PROFILE_IMAGE: //action actionGetMyProfile
            return { ...state, isLoading: true }; //set isLoading = true để gọi màn hình loading

        case ActionTypes.GET_PROFILE_IMAGE_SUCCESS: //actionGetMyProfileSuccess
            return { ...state, profile: action.payload, isLoading: false }; //gán data profile trả về từ api vào profile trong store, set isLoading = false để tắt màn hình loading

        case ActionTypes.GET_PROFILE_IMAGE_FAILED: //actionGetMyProfileFailed
            return { ...state, isLoading: true }; //set isLoading = false để tắt màn hình loading

        case ActionTypes.RESET_GET_PROFILE_IMAGE: //actionGetMyProfileFailed
            return { ...state, isLoading: false, profile: {} }; //set isLoading = false để tắt màn hình loading

        default:
            return state;
    }
};

export default getProfileImageReducer;
