import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTERATION_FAIL, REGISTERATION_REQUEST, REGISTERATION_SUCCESS, SUBMIT_PROFILE_FAIL, SUBMIT_PROFILE_REQUEST, SUBMIT_PROFILE_SUCCESS } from "../Constants/RegistrationConstants";

export const registrationReducer = (state = {}, action) => {
    switch (action.type) {

        case REGISTERATION_REQUEST:
        case SUBMIT_PROFILE_REQUEST:
        case LOAD_USER_REQUEST:
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                success: false,
                submitprofile: false
            }

        case REGISTERATION_SUCCESS:

        case LOAD_USER_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                success: true,
                setup: true,
                submitprofile: true
            }


        case SUBMIT_PROFILE_SUCCESS:

            return {
                ...state,
                loading: false,

                user: action.payload.user,

                submitprofile: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,

                setup: true
            }

        case REGISTERATION_FAIL:
        case SUBMIT_PROFILE_FAIL:
        case LOAD_USER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                success: false,
                user: null,
                setup: false,
                submitprofile: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                success: false,
                isAuthenticated: false,
                setup: false
            };
        default:
            return state;
    }
} 