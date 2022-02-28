import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';
import MachineDetails from './MachineDetails';
import { useNavigate } from 'react-router-dom';

const MachineList = () => {
  let navigate = useNavigate();

  const [machines, setMachines] = useState();
  const [error, setError] = useState();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    getMachines();
    setUpdated(false);
  }, [updated]);

  function getMachines() {
    axios.get(API_URL + '/user/listMachine')
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
      console.log(err.message);
      setError(err.message);
    })
  };

  let machineList = machines ? machines.map((data) => {
    return (
        <ListGroup.Item as="li" action href={`#${data.id}`} key={data.id}>
          <span className='fs-5'>
            {data.name}
          </span>
        </ListGroup.Item>
      )
    })
    : 
    null;

  let machineDescription = machines ? machines.map((machine) => {
    return (
      <Tab.Pane eventKey={`#${machine.id}`} key={machine.id}>
        <MachineDetails data={machine} setUpdated={setUpdated} />
      </Tab.Pane>
    )
  })
  :
  null;

  return (
    <Tab.Container defaultActiveKey={machines ? `#${machines[0].id}` : ''}>
      <Row>
        {
          machineList ?
          (
            <>
              <Col sm={4} className='mt-4'>
                {machineList ? 
                  (
                    <ListGroup as="ol" numbered>
                      {machineList}
                    </ListGroup>
                  )
                  :
                  (
                    <h3>
                      {error}
                    </h3>
                  )
                }
              </Col>
              <Col sm={8} className='mt-4'>
                <Tab.Content>
                  {machineDescription}
                </Tab.Content>
              </Col>
            </>
          )
          :
          (
            <Col>
                <h3>{error}</h3>
            </Col>
          )
        }
      </Row>
    </Tab.Container>
  )
}

export default MachineList;