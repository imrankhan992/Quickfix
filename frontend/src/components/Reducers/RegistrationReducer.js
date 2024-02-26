import { CLEAR_ERRORS, REGISTERATION_FAIL, REGISTERATION_REQUEST, REGISTERATION_SUCCESS } from "../Constants/RegistrationConstants";

export const registrationReducer = (state = {}, action) => {
    switch (action.type) {
        
        case REGISTERATION_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                success: false
            }
        
        case REGISTERATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                success: true
            }
       
        case REGISTERATION_FAIL:
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