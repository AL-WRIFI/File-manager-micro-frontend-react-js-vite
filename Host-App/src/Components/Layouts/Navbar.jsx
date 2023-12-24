import { Fragment } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutUser } from "../../Redux/actionCreators/authActions";
import { useDispatch } from "react-redux";
import { changeFolder } from "../../Redux/actionCreators/FolderActions";

const NavbarComponent =()=>{
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state =>state.auth);

  const handleToDashboard =()=>{
    dispatch(changeFolder("root"));
    navigate("/dashboard");
  }

  return (
    <Navbar bg="white" expand="lg" variant="light"className="border-bottom py-3 shadow-sm">
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

                  <Nav.Link as={Link} style={{ marginRight: "10px", marginLeft: "-10px" }}
                    className="text-dark" to="/dashboard/profile">
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
