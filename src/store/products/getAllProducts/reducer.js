import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    payload: {
        total: 0,
        numOfShow: 0,
        page: 1,
        pageSize: parseInt(process.env.REACT_APP_DEFAULT_LIMIT),
        payload: [],
    },
};

const productsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_PRODUCTS:
            return { ...state, isLoading: true };

        case ActionTypes.GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, payload: action.payload, isLoading: false };

        case ActionTypes.GET_ALL_PRODUCTS_FAILED:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};

export default productsReducer;
