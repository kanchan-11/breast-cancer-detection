import { GET_UER_PROFILE_FAILURE, GET_UER_PROFILE_REQUEST, GET_UER_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_PROFILE_SUCCESS } from "./auth.actionType"

const initialState = {
    jwt: null,
    error: null,
    loading: false,
    user: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_UER_PROFILE_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_UER_PROFILE_SUCCESS:
        case UPDATE_USER_PROFILE_SUCCESS:
            return { ...state, user: action.payload, error: null, loading: false }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, jwt: action.payload, loading: false, error: null }
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case GET_UER_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case LOGOUT:
            return initialState; // Reset state to initial values
        default:
            return state
    }
}