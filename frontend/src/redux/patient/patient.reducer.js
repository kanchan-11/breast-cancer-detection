import { CREATE_PATIENT_FAILURE, CREATE_PATIENT_REQUEST, CREATE_PATIENT_SUCCESS, DELETE_PATIENT_FAILURE, DELETE_PATIENT_REQUEST, DELETE_PATIENT_SUCCESS, GET_USERS_PATIENT_FAILURE, GET_USERS_PATIENT_REQUEST, GET_USERS_PATIENT_SUCCESS } from "./patient.actionType"

const initialState = {
    // patient: null,
    loading: false,
    error: null,
    patients: []
}
export const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PATIENT_REQUEST:
        case GET_USERS_PATIENT_REQUEST:
        case DELETE_PATIENT_REQUEST:
            return { ...state, error: null, loading: true }
        case CREATE_PATIENT_SUCCESS:
            return {
                ...state,
                // patient: action.payload,
                patients: [action.payload, ...state.patient],
                loading: false, error: null
            }
        case GET_USERS_PATIENT_SUCCESS:
            return {
                ...state, patients: action.payload, loading: false, error: null
            }
        case DELETE_PATIENT_SUCCESS:
            return {
                ...state,
                patients: state.patients.filter((patient) => patient.id !== action.payload), 
                loading: false,
                error: null,
            }
        case CREATE_PATIENT_FAILURE:
        case GET_USERS_PATIENT_FAILURE:
        case DELETE_PATIENT_FAILURE:
            return { ...state, error: action.payload, loading: false }
        default:
            return state
    }
}