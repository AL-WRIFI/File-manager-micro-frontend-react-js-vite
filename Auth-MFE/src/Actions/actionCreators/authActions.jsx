import * as types from "../actionsTypes/authActionsTypes";
import fire from "../../config/firebase";
import { toast } from "react-toastify";

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


export const signInUser = (email,password,setSuccess) =>(dispatch) =>{
   fire.auth().signInWithEmailAndPassword(email,password).then((user)=>{
    dispatch(loginUser({
      uid: user.user.uid,
      email: user.user.email,
      displayName: user.user.displayName,
    }));
    setSuccess(true);
  }).catch(()=>{
    toast.error("هناك خطأ");
   });

}
export const signUpUser = (name,email,password ,setSuccess) =>(dispatch) =>{
  fire.auth().createUserWithEmailAndPassword(email,password).then(()=>{
    fire.auth().currentUser.updateProfile({
      displayName:name,
    }).then(()=>{
      const currenUser = fire.auth().currentUser;
      dispatch(loginUser({
        uid: currenUser.uid,
        email: currenUser.email,
        name: currenUser.displayName,
      }));
      setSuccess(true);
    }).catch((error)=>{
        console.log(error);
    })
  }).catch((error)=>{
    console.log(error);
    if (error.code === "auth/email already in use") {
      toast.error("Email Already Exists!");
    }
    if (error.code === "auth/weak-password") {
      toast.error("Weak Password");
    }
  })

}
export const signOutUser = () =>(dispatch) =>{
  fire.auth().signOut().then(()=>{
    dispatch(logoutUser());
  });
}

export const checkIsLoggedIn =() => dispatch =>{
  fire.auth().onAuthStateChanged((user)=>{
    if(user){
     dispatch(loginUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
     }));
    }
    });
}

