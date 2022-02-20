import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../utils/AuthenticationService';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const ManageUsers = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState(null);
  const [error, setError] = useState();

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
    axios.get(API_URL + '/admin/listUsers')
    .then((response) => {
      Array.isArray(response.data) ?
      setUserList(response.data) : setError("Response received is not in array")

    })
    .catch((err) => {
      setError(err.message);
    })
  }, []);

  let users = userList !== null ? userList.map((data) => { 
      return (<Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Enable/Disable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.id}</td>
            <td>{data.fname + ' ' + data.lname}</td>
            <td>{data.email}</td>
            <td>{data.role}</td>
            <td>{data.isEnabled}</td>
          </tr>
        </tbody>
      </Table>)
    })
    :
    error;
  
  return (
    <Container>
      {
        error ?
        <div className='text-center mt-5'>
          {error}
        </div>
        :
        users
      }
    </Container>
  )
}

export default ManageUsers;