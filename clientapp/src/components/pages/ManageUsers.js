import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../utils/AuthenticationService';
import axios from 'axios';
import { Alert, Button, Card, Col, Container, Form, FormControl, InputGroup, Modal, Row, Table } from 'react-bootstrap';
import MessageToaster from '../utils/MessageToaster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUndo, faUpload, faRefresh } from '@fortawesome/free-solid-svg-icons';

const ManageUsers = () => {
  let navigate = useNavigate();

  // Users list state variables
  const [userList, setUserList] = useState(null);
  const [error, setError] = useState();

  // status update state variables
  const [updateError, setUpdateError] = useState();
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [selectUserStatus, setSelectUserStatus] = useState();
  const [confirmAction, setConfirmAction] = useState(false);
  const [selectUserId, setSelectUserId] = useState();
  const [updateToastShow, setUpdateToastShow] = useState(false);

  // password reset action state variables
  const [passResetError, setPassResetError] = useState();
  const [passResetModalShow, setPassResetModalShow] = useState(false);
  const [passResetToastShow, setPassResetToastShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  let isloggedIn = AuthenticationService.isUserLoggedIn();

  useEffect(() => {
    if (!isloggedIn) {
      navigate('/login');
    }
    else if (AuthenticationService.getLoggedInUserRole() === 'USER') {
      navigate('/dashboard')
    }
    return () => {
      setError();
      setUserList();
    }
  }, [isloggedIn, navigate]);

  useEffect(() => {
    getUserList();
  }, []);

  function getUserList() {
    axios.get(API_URL + '/admin/listUsers')
    .then((response) => {
      if (Array.isArray(response.data)) {
        setUserList(response.data); 
        setError(null);
      }
      else {
        setError("Response received is not an array");
        setUserList(null);
      }
    })
    .catch((err) => {
      setUserList(null);
      setError(err.message);
    })
  }

  useEffect(() => {
    if (confirmAction) {
      updateUserStatus();
    }
    return () => {
      setConfirmAction(false);
      setSelectUserId();
      setSelectUserStatus();
      setStatusModalShow(false);
    }
  // eslint-disable-next-line
  }, [confirmAction])

  function updateUserStatus() {
    const url = API_URL + 
                '/admin/updateStatus?id=' + 
                selectUserId.toString() + 
                '&isEnabled=' + 
                selectUserStatus.toString();
    axios.put(url)
    .then(() => {
      setUpdateError();
      getUserList();
    })
    .catch((err) => {
      setUpdateError(err.message);
      setUpdateToastShow(true);
    })
  }

  const onPasswordResetSubmit = () => {
    if (selectUserId === undefined) {
      return ( () => {
          setPassResetError("Select id is undefined!");
          setPassResetToastShow(true);
        }
      )
    }
    const url = API_URL + 
                '/admin/resetPassword?id=' + 
                selectUserId.toString();
    axios.put(url, newPassword, 
      {
        headers: {"Content-Type": "text/plain"}
      })
    .then(() => {
      setPassResetError();
      setNewPassword('');
      setPassResetModalShow(false);
      setPassResetToastShow(true);
    })
    .catch((err) => {
      setPassResetError(err.message);
      setNewPassword('');
      setPassResetToastShow(true);
    })
  }

  const statusModal = (
    <Modal
      show={statusModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <h4>Do you really want to {selectUserStatus ? " disable " : " enable "} the user?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={() => {
            setConfirmAction(true)
          }}>Yes</Button>
        <Button 
          onClick={() => {
            setSelectUserId();
            setConfirmAction(false);
            setStatusModalShow(false);
          }}>No</Button>
      </Modal.Footer>
    </Modal>
  );

  const passResetModal = (
    <Modal
      show={passResetModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={() => {
        setPassResetModalShow(false);
        setNewPassword("");
      }}
    >
      <Modal.Header closeButton>
        Enter new password for the user?
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            {
              passResetToastShow && passResetError && 
              <Alert variant="danger" onClose={() => setPassResetToastShow(false)} dismissible>
                {passResetError}
              </Alert>
            }
            <Card>
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
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new Password"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="me-3"
          size="sm"
          type="button"
          variant="success"
          onClick={() => onPasswordResetSubmit()}
          disabled={newPassword.length === 0}
        >
          <FontAwesomeIcon icon={faUpload} /> Submit
        </Button>
        <Button
          size="sm"
          type="button"
          variant="info"
          onClick={() => setNewPassword("")}
          disabled={newPassword.length === 0}
        >
          <FontAwesomeIcon icon={faUndo} /> Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );

  let users = (
    (userList !== undefined) && (userList !== null) && (userList !== [])) ? 
    userList
      .filter(user => user.username !== AuthenticationService.getLoggedInUsername())
      .map((data) => { 
      return (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.fname + ' ' + data.lname}</td>
          <td>{data.username}</td>
          <td>{data.email}</td>
          <td>{data.role}</td>
          <td>
            <Button 
              variant='danger'
              onClick={() => {
                              setSelectUserId(data.id);
                              setSelectUserStatus(data.isEnabled);
                              setStatusModalShow(true);
                            }
                          }
              > 
              {data.isEnabled ? "Disable User" : "Enable User"}
            </Button>
          </td>
          <td>
            <Button 
              variant='danger'
              onClick={() => {
                setSelectUserId(data.id);
                setPassResetModalShow(true);
              }
            }
            > 
              Reset Password <FontAwesomeIcon icon={faRefresh} />
            </Button>
          </td>
        </tr>
      )
    })
    :
    '';
  
  return (
    <Container>
      {statusModal}
      {passResetModal}
      {
        error ?
        <div className='text-center mt-5'>
          {error}
        </div>
        :
        (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Enable/Disable</th>
                <th>Password Reset</th>
              </tr>
            </thead>
            {users && 
            <tbody>
              {users}
            </tbody>}
          </Table>
        )
      }
      {
        updateError &&
        <MessageToaster 
          show={updateToastShow} 
          setShow={setUpdateToastShow} 
          message={"Error: " + updateError} 
          variant="danger"
        />
      }
      {
        passResetError ?
        ''
        :
        <MessageToaster 
          show={passResetToastShow} 
          setShow={setPassResetToastShow} 
          message={"User's password reset successful!!!"} 
          variant="success"
        />
      }

    </Container>
  )
}

export default ManageUsers;