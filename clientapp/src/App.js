import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './components/utils/NavMenu';
import Home from './components/pages/Home';
import Login from './components/utils/Login';
import { Col, Container, Row } from 'react-bootstrap';
import AdminHome from './components/pages/AdminService/AdminPortal';
import Dashboard from './components/pages/Dashboard';
import Footer from './components/utils/Footer';
import Profile from './components/pages/Profile';
import ChangePassword from './components/utils/ChangePassword';
import ManageUsers from './components/pages/AdminService/ManageUsers';
import AddNewUser from './components/pages/AdminService/AddNewUser';
import MachineList from './components/pages/machineService/MachineList';
import AddNewMachine from './components/pages/machineService/AddNewMachine';
import AddMaintenance from './components/pages/maintenanceService/AddMaintenance';
import GenerateMaintenanceReport from './components/pages/maintenanceService/GenerateMaintenanceReport';
import AppUsages from './components/pages/AdminService/AppUsages';

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
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/changePassword' element={<ChangePassword />} />
            <Route path='/admin/manageUsers' element={<ManageUsers />} />
            <Route path='/admin/addNewUser' element={<AddNewUser />} />
            <Route path='/admin/appUsages' element={<AppUsages />} />
            <Route path='/dashboard/manageMachine' element={<MachineList />} />
            <Route path='/dashboard/addNewMachine' element={<AddNewMachine />} />
            <Route path='/dashboard/recordNewMaintenance' element={<AddMaintenance />} />
            <Route path='/dashboard/generateMaintenanceReport' element={<GenerateMaintenanceReport />} />
          </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
