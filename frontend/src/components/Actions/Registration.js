import axiosInstance from "@/ulities/axios";
import { LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ADMIN_FAIL, LOGOUT_ADMIN_REQUEST, LOGOUT_ADMIN_SUCCESS, REGISTERATION_FAIL, REGISTERATION_REQUEST, REGISTERATION_SUCCESS, SUBMIT_PROFILE_FAIL, SUBMIT_PROFILE_REQUEST, SUBMIT_PROFILE_SUCCESS } from "../Constants/RegistrationConstants";

export const Registration = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTERATION_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosInstance.post("/api/v1/serviceProvider/registration", userData, config);

        dispatch({ type: REGISTERATION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REGISTERATION_FAIL, payload: error?.response?.data?.message })
    }
}

export const submitProfileAction = (userData) => async (dispatch) => {
    try {
        dispatch({ type: SUBMIT_PROFILE_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axiosInstance.post("/api/v1/setup", userData, config);

        dispatch({ type: SUBMIT_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SUBMIT_PROFILE_FAIL, payload: error?.response?.data?.message })
    }
}

// LOAD DATA

export const loadUserData = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
       
        const { data } = await axiosInstance.get("/api/v1/user/mydata");

        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error?.response?.data?.message })
    }
}

export const loginAction = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axiosInstance.post("/api/v1/login",userData,config);

        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error?.response?.data?.message})
    }
}

