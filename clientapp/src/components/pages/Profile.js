import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../utils/AuthenticationService';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOut,
  faUserCircle,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';
import '../../css/Profile.css';
import axios from 'axios';

const Profile = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  });

  // useEffect(() => {
    
  // });

  const logout = () => {
    if (AuthenticationService.isUserLoggedIn()) {
      AuthenticationService.logout();  
    }
    else {
      navigate('/login');
    }
  }

  return (
    <Container className='justify-content-center mt-3'>
      <Row>
        <Col>
          <div className='text-center pro_pic'>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
        </Col>
      </Row>
      <Row xs="auto" className='justify-content-center'>
        <Col className="nav-link text-dark fs-5 fw-bold text-center">
            <FontAwesomeIcon icon={faIdCard} /> Username : 
        </Col>
        <Col className="nav-link text-dark fs-5 fw-bold text-center">
          SUshant
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Link className="nav-link text-dark fs-5 fw-bold text-center" aria-current="page" to={"logout"}>
          Change Password
        </Link>
      </Row>
      <Row className='justify-content-md-center mt-3'>
        <Col>
          <Link className="nav-link text-danger fs-5 fw-bold text-center" aria-current="page" to="/logout" onClick={logout}>
            <FontAwesomeIcon icon={faSignOut} /> Logout
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile;