import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from '../utils/AuthenticationService';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {
  faUserFriends,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminPortal = () => {
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
  
  return (
    <Container>
      <Row className='mb-5'>
        <Col className="text-center mt-5">
          <Link to={"manageUsers"}>
            <Button variant='outline-secondary'>
              <div className='text-center pro_pic'>
                <FontAwesomeIcon icon={faUserFriends} />
              </div>
              <span className='fw-bold'>
                Manage Existing Users
              </span>
            </Button>
          </Link>
        </Col>
        <Col className="text-center mt-5">
          <Link to={"addNewUser"}>
            <Button variant='outline-secondary'>
              <div className='text-center pro_pic'>
                <FontAwesomeIcon icon={faUserPlus} />
              </div>
              <span className='fw-bold px-4'>
                Add new User
              </span>
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPortal;