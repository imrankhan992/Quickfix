import axiosInstance from "@/ulities/axios";
import { ADMIN_DATA_FAIL, ADMIN_DATA_REQUEST, ADMIN_DATA_SUCCESS } from "../Constants/AdminConstants";

export const adminAction = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DATA_REQUEST });
        
        const { data } = await axiosInstance.get("/api/v1/admin/mydata");

        dispatch({ type: ADMIN_DATA_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADMIN_DATA_FAIL, payload: error.response.data.message })
    }
}