import axiosInstance from "@/ulities/axios";
import { SP_DATA_FAIL, SP_DATA_REQUEST, SP_DATA_SUCCESS } from "../Constants/SpConstants";

export const spDataAction = () => async (dispatch) => {

    try {
        dispatch({ type: SP_DATA_REQUEST });
        
        const { data } = await axiosInstance.get("/api/v1/admin/get-all-sp-provider");

        dispatch({ type: SP_DATA_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SP_DATA_FAIL, payload: error.response.data.message })
    }
}