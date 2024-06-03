import { GET_UER_PROFILE_FAILURE, GET_UER_PROFILE_REQUEST, GET_UER_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS } from "./auth.actionType"
import axios from "axios"
import { API_BASE_URL, api } from "../../config/api"
export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data)
        if (data.token) {
            localStorage.setItem("jwt", data.token)

        }
        console.log("login success", data);
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })
    } catch (error) {
        console.log("----------------", error);
        dispatch({ type: LOGIN_FAILURE, payload: error })
        throw error
    }
}

export const registerUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data)
        if (data.token) {
            localStorage.setItem("jwt", data.token)
        }
        console.log("register success", data);
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })
    } catch (error) {
        console.log("----------------", error);
        dispatch({ type: REGISTER_FAILURE, payload: error })
    }
}

export const getUserProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_UER_PROFILE_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
        })

        console.log("get user profile success", data);
        dispatch({ type: GET_UER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        console.log("----------------", error);
        dispatch({ type: GET_UER_PROFILE_FAILURE, payload: error })
    }
}

export const updateUserProfileAction = (reqData,jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST })
    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData,{
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
        })

        console.log("update user profile success", data);
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        console.log("----------------", error);
        dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error })
    }
}

export const logoutUserAction = () => {
    return {
      type: LOGOUT,
    };
  };