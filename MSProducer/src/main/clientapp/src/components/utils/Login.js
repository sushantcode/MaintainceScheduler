import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUser,
  faLock,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService from "./AuthenticationService";

const Login = (props) => {
  const [error, setError] = useState();
  const [show, setShow] = useState(true);

  let navigate = useNavigate();
  let authenticationService = new AuthenticationService();

  const initialState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const credentialChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateUser = () => {
    authenticationService
    .executeBasicAuthenticationService(user.username, user.password)
    .then((response) => {
      console.log(response.data);
      authenticationService.registerSuccessfulLogin(user.username, user.password);
      navigate('/user');
    })
    .catch((error) => {
      console.log(error.message);
      setShow(true);
      resetLoginForm();
      setError("Invalid email and password");
    });
  };

  const resetLoginForm = () => {
    setUser(initialState);
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={5}>
        {show && props.message && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            {props.message}
          </Alert>
        )}
        {show && error && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>
        )}
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header className="text-center">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Card.Header>
          <Card.Body>
            <Form className="mb-4">
              <Form.Group as={Col}>
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={credentialChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Username"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group as={Col}>
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={credentialChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Password"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer className="mb-3 mt-3" style={{ textAlign: "right" }}>
            <Button
              size="sm"
              type="button"
              variant="success"
              onClick={validateUser}
              disabled={user.username.length === 0 || user.password.length === 0}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Button>{" "}
            <Button
              size="sm"
              type="button"
              variant="info"
              onClick={resetLoginForm}
              disabled={user.username.length === 0 && user.password.length === 0}
            >
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;