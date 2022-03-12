import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Card, Col, Form, FormControl, InputGroup, ListGroup, Modal, Row } from 'react-bootstrap';
import { API_URL } from '../../utils/AuthenticationService';

const SelectMachineModal = (props) => {
  const [error, setError] = useState();
  const [machines, setMachines] = useState();
  const [search, setSearch] = useState('');

  useState(() => {
    if (props.show) {
      getMachines();
    }
  }, []);

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


  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={() => {
        props.setShow(false);
      }}
    >
      <Modal.Header closeButton>
        Select the machine?
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            {
              error && 
              <Alert variant="danger" dismissible>
                {error}
              </Alert>
            }
            <Card>
              <Card.Header>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faSearch} className='me-2' />
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="maintenanceDetail"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Start typing name..."
                    />
                  </InputGroup>
                </Form.Group>
              </Card.Header>
              <Card.Body style={{ height: "50vh", overflowY: "auto" }}>
                <ListGroup as='ul'>
                  {
                    machines ? machines
                                .filter((data) => data.name.toLowerCase().startsWith(search.toLowerCase()))
                                .map((machine) => {
                      return (
                        <ListGroup.Item
                          as='li'
                          key={machine.id}
                          action
                          className='mt-2'
                          style={{cursor: "pointer"}} 
                          onClick={() => {
                            props.setMachine(machine);
                            props.setShow(false);
                          }}
                        >
                          {machine.name}
                        </ListGroup.Item>
                      )
                    })
                    :
                    ''
                  }
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default SelectMachineModal;