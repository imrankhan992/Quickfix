import { CLEAR_ERRORS, SP_DATA_FAIL, SP_DATA_REQUEST, SP_DATA_SUCCESS } from "../Constants/SpConstants";

export const spReducer = (state = {}, action) => {
    switch (action.type) {
        case SP_DATA_REQUEST:
            return {
                SPloading: true,

                SPsuccess: false,
            };

        case SP_DATA_SUCCESS:
            return {
                ...state,
                SPloading: false,

                SPuser: action.payload.user,
                SPsuccess: true,
            };

        case SP_DATA_FAIL:
            return {
                ...state,
                SPloading: false,

                SPerror: action.payload,
                SPsuccess: false,
                SPuser: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                SPerror: null,
                SPsuccess: false,

            };
        default:
            return state;
    }
};
