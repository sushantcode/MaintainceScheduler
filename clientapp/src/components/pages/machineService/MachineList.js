import React, { useEffect, useState } from 'react';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import MachineDetails from './MachineDetails';
import { useNavigate } from 'react-router-dom';

const MachineList = () => {
  let navigate = useNavigate();

  const [machines, setMachines] = useState();
  const [error, setError] = useState();
  const [updated, setUpdated] = useState(false);
  const [defaultActiveKey, setDefaultActiveKey] = useState('52e5117c-6c25-422e-a4f0-9cbec6c522fe');

  useEffect(() => {
    let isSubscribed = true;
    if (!AuthenticationService.isUserLoggedIn() && isSubscribed) {
      navigate('/login');
    }
    return () => (isSubscribed = false);
  }, [navigate]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getMachines();
      setUpdated(false);
    }
    return () => (isSubscribed = false);
  }, [updated]);

  function getMachines() {
    AuthenticationService.Axios().get(API_URL + '/user/listMachine')
    .then((response) => {
      if (Array.isArray(response.data)) {
        setMachines(response.data);
        setError(null);
      }
      else {
        setError("Response received is not an array");
        setMachines(null);
      }
    })
    .catch((err) => {
      setMachines(null);
      setError(err.message);
    });
  };

  let machineList = machines ? machines.map((data, index) => {
    return (
        <Nav.Item key={data.id}>
          <Nav.Link className='fs-5 fw-bold' eventKey={data.id}>
            {(index + 1) + '. ' + data.name}
          </Nav.Link >
        </Nav.Item>
      )
    })
    : 
    null;

  let machineDescription = machines ? machines.map((machine) => {
    return (
      <Tab.Pane eventKey={machine.id} key={machine.id}>
        <MachineDetails 
          data={machine}
          setDefaultActiveKey={setDefaultActiveKey}
          getMachines={getMachines}
          setUpdated={setUpdated}
        />
      </Tab.Pane>
    )
  })
  :
  null;

  let returnValue = machineList ?
  <Tab.Container defaultActiveKey={defaultActiveKey}>
    <Row className='mt-4'>
      <Col sm={4} className='mb-4'>
        <Nav variant="pills" className="flex-column">
          {machineList}
        </Nav>
      </Col>
      <Col sm={8} className='mb-4 border-start'>
        <Tab.Content className=''>
          {machineDescription}
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  :
  <h3 className='text-center text-danger'>
    {error}
  </h3>
  return returnValue;
}

export default MachineList;