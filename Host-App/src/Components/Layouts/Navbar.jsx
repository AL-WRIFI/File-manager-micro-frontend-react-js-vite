import { Fragment ,lazy,Suspense} from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeFolder } from "Folders_MFE/actions";
import { signOutUser } from "Auth_MFE/authActions";
const NavbarComponent =()=>{
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user ,darkMode} = useSelector((state) =>({
    isAuthenticated : state.auth.isAuthenticated ,
    user : state.auth.user,
    darkMode: state.Settings.darkMode,
  }));
  const handleToDashboard =()=>{
    dispatch(changeFolder("root"));
    navigate("/dashboard");
  }
  // const handleSignOutUser =()=>{
  //   dispatch(signOutUser());
  //   navigate("/dashboard");
  // }
  const theme = darkMode ? "dark" : "light";
  return (
    <Navbar bg={theme} expand="lg" variant={theme} className="border-bottom py-3 shadow-sm">
        <Navbar.Brand style={{ marginLeft: "60px", marginRight: "auto" }} >
          File Management System
        </Navbar.Brand>

        <Nav style={{ marginRight: "60px" }}>
            {isAuthenticated ?(
                <Fragment>
                  <Nav.Link className="d-flex align-items-center justify-content-between"
                    style={{ pointerEvents: "unset", cursor: "text" }}>
                    Welcome
                  </Nav.Link>

                  <Nav.Link style={{ color: darkMode  ? "white" : "black", marginRight: "10px", marginLeft: "-10px" }}
                    className="" to="/dashboard/profile">
                    <strong>{user.displayName}</strong>
                  </Nav.Link>

                  <Nav.Link as={Button} variant="success" active style={{ marginRight: "5px" }}
                    size="sm" onClick={handleToDashboard}className="text-white">
                    Dashboard
                  </Nav.Link>

                  <Nav.Link as={Button} variant="primary" active style={{ marginRight: "5px" }}
                    size="sm"className="text-white" onClick={() => dispatch(signOutUser())}>
                    LogOut
                  </Nav.Link>
              </Fragment>
              ):(
               <Fragment>
                  <Nav.Link as={Button} variant="primary" active style={{ marginRight: "5px" }}
                    size="sm" className="text-white" onClick={() =>navigate("/login")}>
                    Login
                  </Nav.Link>

                  <Nav.Link as={Button} variant="success" onClick={() =>navigate("/signup")}
                    active size="sm" className="text-white">
                    Register
                  </Nav.Link>
               </Fragment>
              )}   
        </Nav>
    </Navbar>
  );

};

export default NavbarComponent;
