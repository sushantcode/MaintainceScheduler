import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../utils/AuthenticationService';
import axios from 'axios';
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import {
  faUserFriends,
  faUserPlus,
  faRefresh
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminPortal = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState(null);

  let isloggedIn = AuthenticationService.isUserLoggedIn();

  useEffect(() => {
    if (!isloggedIn) {
      navigate('/login');
    }
    else if (AuthenticationService.getLoggedInUserRole() === 'USER') {
      navigate('/dashboard')
    }
  }, [isloggedIn, navigate]);

  useEffect(() => {
    axios.get(API_URL + '/admin/listUsers')
    .then((response) => {
      console.log(response.data);
      setUserList(response.data);
    })
  }, []);

  
  return (
    <Container className='mt-5'>
      <Row className='mb-5'>
        <Col className="text-center">
          <Button variant='outline-secondary'>
            <div className='text-center pro_pic'>
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
            <span className='fw-bold'>
              Manage Existing Users
            </span>
          </Button>
        </Col>
        <Col className="text-center">
          <Button variant='outline-secondary'>
            <div className='text-center pro_pic'>
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
            <span className='fw-bold'>
              Add new User
            </span>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button variant='outline-secondary'>
            <div className='text-center pro_pic'>
              <FontAwesomeIcon icon={faRefresh} />
            </div>
            <span className='fw-bold'>
              Reset User Password
            </span>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPortal;