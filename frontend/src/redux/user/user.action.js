import { api } from "../../config/api";
import { GET_ALL_USERS_REQUEST,GET_ALL_USERS_SUCCESS,GET_ALL_USERS_FAILURE } from "./user.actionType"

export const getAllUsersAction=(jwt)=>async(dispatch)=>{
    
    dispatch({type:GET_ALL_USERS_REQUEST})
    try{
        const { data } = await api.get(`/api/users`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
        })

        dispatch({type:GET_ALL_USERS_SUCCESS,payload:data})
        console.log("get all users",data);
    }
    catch(error){
        console.log("error",error);
        dispatch({type:GET_ALL_USERS_FAILURE,payload:error})
    }
}