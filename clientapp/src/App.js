import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './components/utils/NavMenu';
import Home from './components/pages/Home';
import Login from './components/utils/Login';
import UserHome from './components/pages/UserHome';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import AdminHome from './components/pages/AdminPortal';
import Dashboard from './components/pages/Dashboard';
import Footer from './components/utils/Footer';
import Profile from './components/pages/Profile';
import ChangePassword from './components/utils/ChangePassword';
import ManageUsers from './components/pages/ManageUsers';

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
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/changePassword' element={<ChangePassword />} />
            <Route path='/admin/manageUsers' element={<ManageUsers />} />
          </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
