import { ADMIN_DATA_FAIL, ADMIN_DATA_REQUEST, ADMIN_DATA_SUCCESS, CLEAR_ERRORS } from "../Constants/AdminConstants";

export const adminReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DATA_REQUEST:
            return {
                Adminloading: true,

                Adminsuccess: false,
            };

        case ADMIN_DATA_SUCCESS:
            return {
                ...state,
                Adminloading: false,

                Adminuser: action.payload.user,
                Adminsuccess: true,
            };

        case ADMIN_DATA_FAIL:
            return {
                ...state,
                Adminloading: false,

                Adminerror: action.payload,
                Adminsuccess: false,
                Adminuser: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                Adminerror: null,
                Adminsuccess: false,

            };
        default:
            return state;
    }
};
