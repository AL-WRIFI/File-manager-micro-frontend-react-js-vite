import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../Actions/actionCreators/authActions";
import { toast } from "react-toastify";


const Register = () => {

    const [name ,setName] = useState("");
    const [email ,setEmail] = useState("");
    const [password ,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handelSubmit =(e) =>{
      e.preventDefault();
      if(!email || !password || !confirmPassword){
        toast.error("جميع الحقول اجبارية")
        return;
      }
      if(password !== confirmPassword){
        toast.error("كلمة المرور غير متطابقه");
        return;
      }

      dispatch(signUpUser(name,email,password ,setSuccess));
    }

    useEffect(()=>{
      if(success){
        navigate("/dashboard");
      }
    },[success]);


    return (
    <Container>
      <Row>
        <Col md="12">
          <h1 className="display-1 my-5 text-center">Login</h1>
        </Col>
        <Col md="5" className="mx-auto">
          <Form onSubmit={handelSubmit} >
          <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Re-type password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicBtn" className="mt-3">
              <Button
                variant="primary"
                type="submit"
                className="form-control"
                block
              >
                Register
              </Button>
            </Form.Group>
            <p className=" text-right d-flex align-items-center justify-content-end gap-2 ml-auto my-4">
               Already a Member?
              <Link to="/login" className="ml-2 text-decoration-none">
                login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;