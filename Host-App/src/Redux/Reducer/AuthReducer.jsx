import * as types from "../actionsTypes/authActionsTypes";

const initialState = {
    isAuthenticated:false,
    user: {},
};

const AuthReducer = ( state = initialState , action) =>{
    switch(action.type){
      
        case types.USER_LOGIN:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        case types.SIGN_OUT_USER:
            return{
                ...state,
                isAuthenticated: false,
                user: {},
            }
        default:
            return state        

    }
}


export default AuthReducer;