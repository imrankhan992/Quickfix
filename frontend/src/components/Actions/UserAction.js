import axiosInstance from "@/ulities/axios";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../Constants/UserConstants";

export const userRegisterAction = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosInstance.post("/api/v1/user/register",userData,config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message })
    }
}