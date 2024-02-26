import axiosInstance from "@/ulities/axios";
import { REGISTERATION_FAIL, REGISTERATION_REQUEST, REGISTERATION_SUCCESS } from "../Constants/RegistrationConstants";

export const Registration = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTERATION_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosInstance.post("/api/v1/serviceProvider/registration", userData, config);

        dispatch({ type: REGISTERATION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REGISTERATION_FAIL, payload: error.response.data.message })
    }
}