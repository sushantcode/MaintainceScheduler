import React, { useEffect, useState } from "react";
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
  faLock,
  faUndo,
  faUpload
} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService, { API_URL } from "./AuthenticationService";
import axios from 'axios';

const ChangePassword = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate])
  
  const [error, setError] = useState();
  const [show, setShow] = useState(true);

  const initialState = {
    username: AuthenticationService.getLoggedInUsername(),
    oldPassword: "",
    newPassword: "",
  };

  const [newUser, setNewUser] = useState(initialState);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      AuthenticationService.logout();
      navigate('/login', {
        state: {
          message: "Password is changed successfully. Please login again with new password."
        }
      });
    }
    // eslint-disable-next-line
  }, [success, navigate]);

  const credentialChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const submitForm = () => {
    axios.put(API_URL + '/changePassword', newUser)
    .then((resposnse) => {
      if (resposnse.status === 200) {
        setError(null);
        setSuccess(true);
      }
      else {
        setError(resposnse.message);
        resetPasswordForm();
      }
    })
    .catch((err) => {
      setError(err.message);
    });

  };

  const resetPasswordForm = () => {
    setNewUser(initialState);
    setPasswordConfirm("");
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={5}>
        {show && error && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>
        )}
        <Card className={"border border-dark bg-light text-dark"}>
          <Card.Header className="text-center fs-4">
            Change Password
          </Card.Header>
          <Card.Body>
            <Form className="mb-2">
              <Form.Group as={Col}>
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="oldPassword"
                    value={newUser.oldPassword}
                    onChange={credentialChange}
                    placeholder="Enter current Password"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
            <Form className="mb-2">
              <Form.Group as={Col}>
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="newPassword"
                    value={newUser.newPassword}
                    onChange={credentialChange}
                    placeholder="Enter new Password"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
            <Form className="mb-2">
              <Form.Group as={Col}>
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => {setPasswordConfirm(e.target.value)}}
                    placeholder="Confirm new Password"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer className="pt-2 pb-2 mt-3" style={{ textAlign: "right" }}>
            <Button
              className="me-3"
              size="sm"
              type="button"
              variant="success"
              onClick={submitForm}
              disabled={
                newUser.username.length === 0 || 
                newUser.oldPassword.length === 0 ||
                newUser.newPassword.length === 0 ||
                passwordConfirm.length === 0 ||
                (newUser.newPassword !== passwordConfirm) 
              }
            >
              <FontAwesomeIcon icon={faUpload} /> Submit
            </Button>
            <Button
              size="sm"
              type="button"
              variant="info"
              onClick={resetPasswordForm}
              disabled={
                newUser.username.length === 0 && 
                newUser.oldPassword.length === 0 &&
                newUser.newPassword.length === 0 &&
                passwordConfirm.length === 0
              }
            >
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default ChangePassword;