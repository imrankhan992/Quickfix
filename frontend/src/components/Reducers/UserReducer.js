import {
  CLEAR_ERRORS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../Constants/UserConstants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        success: false,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        success: true,
      };

    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        success: false,
        user: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
