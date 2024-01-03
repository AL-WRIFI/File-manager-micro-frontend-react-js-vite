import React from "react";
import { Link } from "react-router-dom";
import { useSelector ,shallowEqual, useDispatch} from "react-redux";
import LoginForm from "../../../components/AuthComponents/LoginForm";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { isAuthenticated , userId } = useSelector((state) =>({ 
    isAuthenticated : state.auth.isAuthenticated ,
    userId: state.auth.user.uid,
  }),shallowEqual);

useEffect(()=>{
    if(!isAuthenticated){
        navigate("/login");
    }else{
      navigate("/dashboard");
    }
  },[isAuthenticated]);    


  return (
    <div className="container-fluid">
      <h1 className="display-1 my-5 text-center">Login here</h1>
      <div className="row">
        <div className="col-md-5 mx-auto mt-5">
          <LoginForm />
          <Link to="/register">Not a member? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
