import { SIGNUP_DATA_REQUEST, SIGNUP_DATA_SUCCESS } from "../Constants/SignupConstants";

export const datasaveAction = (userData) => async (dispatch) => {

    dispatch({ type: SIGNUP_DATA_REQUEST, payload: userData });
}