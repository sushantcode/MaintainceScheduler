import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './components/utils/NavMenu';
import Home from './components/pages/Home';
import Login from './components/utils/Login';
import UserHome from './components/pages/UserHome';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <NavMenu />
      <Container>
        <Row>
          <Col lg={12} className={'mt-2'}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user' element={<UserHome />} />
          </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
