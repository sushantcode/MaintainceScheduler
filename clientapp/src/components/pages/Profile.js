import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../utils/AuthenticationService';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOut,
  faUserCircle,
  faIdCard,
  faEnvelope,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import '../../css/Profile.css';

const Profile = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  });

  const user = {
    username: AuthenticationService.getLoggedInUsername(),
    email: AuthenticationService.getLoggedInUserEmail(),
    fname: AuthenticationService.getLoggedInUserFirstName(),
    lname: AuthenticationService.getLoggedInUserLastName(),
    role: AuthenticationService.getLoggedInUserRole()
  }

  const logout = () => {
      AuthenticationService.logout();
      navigate('/login', {
        state: {
          message: "You are logged out successfully. See you again!!!"
        }
      });
  }

  return (
    <Container className='mt-3'>
      <Row>
        <Col>
          <div className='text-center pro_pic'>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="text-center nav-link text-dark fs-5 fw-bold">
          <span>
            {user.fname + " " + user.lname}
          </span>
        </Col>
      </Row>
      <Row className='mb-3 mt-3'>
        <Col className="text-end text-dark fs-6 fw-bold">
            <FontAwesomeIcon icon={faIdCard} /> Username : 
        </Col>
        <Col className="text-dark fs-6">
          <span>
            {user.username}
          </span>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col className="text-end text-dark fs-6 fw-bold">
            <FontAwesomeIcon icon={faEnvelope} /> Email : 
        </Col>
        <Col className="text-dark fs-6">
          <span>
            {user.email}
          </span>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col className="text-end text-dark fs-6 fw-bold">
            <FontAwesomeIcon icon={faUserPlus} /> Role : 
        </Col>
        <Col className="text-dark fs-6">
          <span>
            {user.role}
          </span>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Link className="nav-link text-dark text-center" aria-current="page" to={"changePassword"}>
          <Button variant='secondary fs-5 fw-bold'>
            Change Password
          </Button>
        </Link>
      </Row>
      <Row className='mt-3'>
        <Col className="text-center">
          <Button className="fs-5 fw-bold" variant='danger' onClick={logout}>
            <FontAwesomeIcon icon={faSignOut} /> Logout
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile;