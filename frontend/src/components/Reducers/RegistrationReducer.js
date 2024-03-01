import { CLEAR_ERRORS, REGISTERATION_FAIL, REGISTERATION_REQUEST, REGISTERATION_SUCCESS, SUBMIT_PROFILE_FAIL, SUBMIT_PROFILE_REQUEST, SUBMIT_PROFILE_SUCCESS } from "../Constants/RegistrationConstants";

export const registrationReducer = (state = {}, action) => {
    switch (action.type) {
        
        case REGISTERATION_REQUEST:
        case SUBMIT_PROFILE_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                success: false
            }
        
        case REGISTERATION_SUCCESS:
        case SUBMIT_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                success: true
            }
       
        case REGISTERATION_FAIL:
        case SUBMIT_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                success: false,
                user: null
            }
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
} 