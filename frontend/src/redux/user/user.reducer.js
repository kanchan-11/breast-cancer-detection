import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS } from "./user.actionType"

const initialState = {
    
    loading: false,
    error: null,
    users: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_ALL_USERS_REQUEST:
            return { ...state, error: null, loading: false }
        
        case GET_ALL_USERS_SUCCESS:
            return{
                ...state,users:action.payload,loading:false,error:null
            }
        case GET_ALL_USERS_FAILURE:
            return {...state,error:action.payload,loading:false}
        default:
            return state
    }
}