import * as types from "../../actionsTypes/authActionsTypes";

export const loginUser = (payload)=>{
  return{
    type: types.USER_LOGIN,
    payload
  }
};

export const logoutUser = () =>{
   return{
    type: types.SIGN_OUT_USER,
   }
}

