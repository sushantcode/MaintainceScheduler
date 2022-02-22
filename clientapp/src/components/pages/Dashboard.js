import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../utils/AuthenticationService';
import { Col, Container, Row } from 'react-bootstrap';

const Dashboard = () => {
  let navigate = useNavigate();

  let isloggedIn = AuthenticationService.isUserLoggedIn();

  useEffect(() => {
    if (!isloggedIn) {
      navigate('/login');
    }
  }, [isloggedIn, navigate]);

  return (
    <Container>
      <Row>
        <Col>
        ghjasd
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard;