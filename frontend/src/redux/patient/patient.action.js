import { API_BASE_URL, api } from "../../config/api"
import axios from "axios"
import { CREATE_PATIENT_FAILURE, CREATE_PATIENT_REQUEST, CREATE_PATIENT_SUCCESS, DELETE_PATIENT_FAILURE, DELETE_PATIENT_REQUEST, DELETE_PATIENT_SUCCESS, GET_USERS_PATIENT_FAILURE, GET_USERS_PATIENT_REQUEST, GET_USERS_PATIENT_SUCCESS } from "./patient.actionType"

export const createPatientAction = (jwt) => async (dispatch) => {
    dispatch({ type: CREATE_PATIENT_REQUEST })
    try {
        const { data } = await api.post('/api/patients/user', {

            headers: {
                "Authorization": `Bearer ${jwt}`
            },

        })
        dispatch({ type: CREATE_PATIENT_SUCCESS, payload: data })
        console.log("created patients ", data);
    }
    catch (error) {
        console.log("error", error);
        dispatch({ type: CREATE_PATIENT_FAILURE, payload: error })
    }
}

export const getUserPatientAction = (jwt) => async (dispatch) => {

    dispatch({ type: GET_USERS_PATIENT_REQUEST })
    try {
        // const {data} = await api.get(`${API_BASE_URL}/api/patients/user/${userId}`)
        const { data } = await api.get(`/api/patients/user`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
        })

        dispatch({ type: GET_USERS_PATIENT_SUCCESS, payload: data })
        console.log("get users patients ", data);
    }
    catch (error) {
        console.log("error", error);
        dispatch({ type: GET_USERS_PATIENT_FAILURE, payload: error })
    }
}

export const deletePatientAction = (jwt,id) => async (dispatch) => {
    dispatch({ type: DELETE_PATIENT_REQUEST })
    try {
        const { data } = await api.delete(`/api/patients/${id}/user`, {

            headers: {
                "Authorization": `Bearer ${jwt}`
            },

        })
        dispatch({ type: DELETE_PATIENT_SUCCESS, payload: id })
        console.log("deleted patient ", data.message);
    }
    catch (error) {
        console.log("error", error);
        dispatch({ type: CREATE_PATIENT_FAILURE, payload: error })
    }
}