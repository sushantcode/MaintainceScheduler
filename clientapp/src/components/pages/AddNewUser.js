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
  ToggleButton,
  Modal
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUndo,
  faUpload,
  faInfo,
  faUser,
  faEnvelope,
  faUserLock
} from "@fortawesome/free-solid-svg-icons";
import AuthenticationService, { API_URL } from "../utils/AuthenticationService";
import axios from 'axios';

const AddNewUser = () => {
  let navigate = useNavigate();

  let isloggedIn = AuthenticationService.isUserLoggedIn();

  useEffect(() => {
    if (!isloggedIn) {
      navigate('/login');
    }
    else if (AuthenticationService.getLoggedInUserRole() === 'USER') {
      navigate('/dashboard')
    }
  }, [isloggedIn, navigate]);

  const initialState = {
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    role: ""
  };
  
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [newUser, setNewUser] = useState(initialState);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [processing, setProcessing] = useState(false);

  const credentialChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  useEffect(() => {
    if (confirmAction) {
      registerNewUser();
    }
    return () => {
      setConfirmAction(false);
      setProcessing(false);
      setShow(true);
      setModalShow(false);
      resetForm();
    }
  // eslint-disable-next-line
  }, [confirmAction])

  const registerNewUser = () => {
    axios.post(API_URL + '/admin/registerNewUser', newUser)
    .then((resposnse) => {
      if (resposnse.status === 200) {
        setError(null);
      }
      else {
        setError(resposnse.message);
      }
    })
    .catch((err) => {
      setError(err.message);
    });
  };

  const resetForm = () => {
    setNewUser(initialState);
    setPasswordConfirm("");
  };

  const modal = (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <h4>
          {processing ? "Request processing..." : "Do you really want to proceed?"}
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={processing}
          onClick={() => {
              setProcessing(true);
              setConfirmAction(true);
            }}
        >
          Yes
        </Button>
        <Button
          disabled={processing}
          onClick={() => {
            setConfirmAction(false);
            setModalShow(false);
          }}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <Row className="justify-content-md-center mt-5">
      {modal}
      <Col md={7}>
        {show && error && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>
        )}
        {show && !error && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            "User added successfully."
          </Alert>
        )}
        <Card className={"border border-dark bg-light text-dark"}>
          <Card.Header className="text-center fs-4">
            Register New User
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group as={Col} className="mb-2">
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faInfo} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="fname"
                    value={newUser.fname}
                    onChange={credentialChange}
                    placeholder="Enter First Name"
                  />
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="lname"
                    value={newUser.lname}
                    onChange={credentialChange}
                    placeholder="Enter Last Name"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className="mb-2">
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={credentialChange}
                    placeholder="Enter Username"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className="mb-2">
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={credentialChange}
                    placeholder="Enter Email"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className="mb-2">
                <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={credentialChange}
                    placeholder="Enter a Password"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className="mb-2">
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
                    placeholder="Confirm Password"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className="mb-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUserLock} />
                  </InputGroup.Text>
                  <ToggleButton
                    className="shadow-none"
                    id="admin"
                    type="radio"
                    variant="outline-info"
                    name="role"
                    value="ADMIN"
                    checked={newUser.role === "ADMIN"}
                    onChange={credentialChange}
                  >
                    ADMIN
                  </ToggleButton>
                  <ToggleButton
                    className="shadow-none"
                    id="user"
                    type="radio"
                    variant="outline-info"
                    name="role"
                    value="USER"
                    checked={newUser.role === "USER"}
                    onChange={credentialChange}
                  >
                    USER
                  </ToggleButton>
                </InputGroup>
              </Form.Group>
              <input 
                type="submit" 
                style={{display: "none"}} 
                disabled 
              />
            </Form>
          </Card.Body>
          <Card.Footer className="pt-2 pb-2 mt-3" style={{ textAlign: "right" }}>
            <Button
              className="me-3"
              size="sm"
              type="button"
              variant="success"
              onClick={() => setModalShow(true)}
              disabled={
                newUser.fname.length === 0 || newUser.lname.length === 0 ||
                newUser.username.length === 0 || newUser.email.length === 0 ||
                newUser.password.length === 0 || passwordConfirm.length === 0 ||
                newUser.role.length === 0 || (newUser.password !== passwordConfirm)
              }
            >
              <FontAwesomeIcon icon={faUpload} /> Submit
            </Button>
            <Button
              size="sm"
              type="button"
              variant="info"
              onClick={resetForm}
              disabled={
                newUser.fname.length === 0 && newUser.lname.length === 0 &&
                newUser.username.length === 0 && newUser.email.length === 0 &&
                newUser.password.length === 0 && passwordConfirm.length === 0 &&
                newUser.role.length === 0
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

export default AddNewUser;