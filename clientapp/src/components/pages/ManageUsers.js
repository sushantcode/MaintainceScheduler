import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../utils/AuthenticationService';
import axios from 'axios';
import { Button, Container, Modal, Table, Toast, ToastContainer } from 'react-bootstrap';

const ManageUsers = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState(null);
  const [error, setError] = useState();
  const [updateError, setUpdateError] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [selectUserStatus, setSelectUserStatus] = useState();
  const [selectUserId, setSelectUserId] = useState();
  const [confirmAction, setConfirmAction] = useState(false);

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
      console.log(response.data);
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
      setModalShow(false);
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
      setToastShow(true);
    })
  }

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
        <h4>Do you really want to {selectUserStatus ? " disable " : " enable "} the user?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={() => {
            setConfirmAction(true)
          }}>Yes</Button>
        <Button 
          onClick={() => {
            setConfirmAction(false);
            setModalShow(false);
          }}>No</Button>
      </Modal.Footer>
    </Modal>
  );

  let toast = (
    <ToastContainer position='middle-center'>
      <Toast show={toastShow} onClose={() => setToastShow(false)} delay={2500} autohide>
        <Toast.Body className='text-danger fs-4'>
          Error: {" " + updateError}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )

  let users = ((userList !== undefined) && (userList !== null) && (userList !== [])) ? userList.map((data) => { 
      return (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.fname + ' ' + data.lname}</td>
          <td>{data.email}</td>
          <td>{data.role}</td>
          <td>
            <Button variant='danger' onClick={() => {
                                          setSelectUserId(data.id);
                                          setSelectUserStatus(data.isEnabled);
                                          setModalShow(true);
                                        }
                                      }> 
              {data.isEnabled ? "Disable User" : "Enable User"}
            </Button>
          </td>
        </tr>
      )
    })
    :
    '';
  
  return (
    <Container>
      {modal}
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
                <th>id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Enable/Disable</th>
              </tr>
            </thead>
            {users && 
            <tbody>
              {users}
            </tbody>}
          </Table>
        )
      }
      {toast}
    </Container>
  )
}

export default ManageUsers;