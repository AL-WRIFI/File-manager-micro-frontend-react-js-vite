import { Fragment, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Outlet} from "react-router-dom";
import { checkIsLoggedIn } from "Auth_MFE/authActions";

const Dashboard =()=>{
  const dispatch = useDispatch();
  const checkIsLoggedin =()=>{
    dispatch(checkIsLoggedIn());
  }
  useEffect(()=>{
    checkIsLoggedin();
  },[])
  
    return(   
        <Fragment>
          <Outlet/>
        </Fragment>
    );
}
export default Dashboard