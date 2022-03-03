import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Repair from '../../statics/repair.png'

const Home = () => {
  return (
  <Container className='pt-4'>
    <Row>
      <Col className='text-center'>
        <Image src={Repair} height={400} />
      </Col>
    </Row>
    <Row>
      <Col className='text-center fs-4'>
        Welcome to Maintenance-Scheduler App!!!
      </Col>
    </Row>
  </Container>
  );
};

export default Home;
