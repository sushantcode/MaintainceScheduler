import { 
  faCircleInfo, 
  faFileClipboard, 
  faHashtag, 
  faUndo, 
  faUpload, 
  faWrench,
  faTriangleExclamation,
  faTrashCan,
  faEdit,
  faFloppyDisk
} 
from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Dropdown, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';
import './Maintenance.css';
import SelectMachineModal from './SelectMachineModal';
import AddNewPartModal from '../partService/AddNewPartModal';

const AddMaintenance = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const initialMantenance = {
    username: AuthenticationService.getLoggedInUsername(),
    maintenanceDetail: '',
    partsReplaced: [],
    quantity: '1',
    remarks: ''
  };
  
  const [maintenance, setMaintenance] = useState(initialMantenance);
  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [selectedPartDisplay, setSelectedPartDisplay] = useState([]);
  const [partList, setPartList] = useState();
  const [showMachineList, setShowMachineList] = useState(true);
  const [machine, setMachine] = useState();
  const [editPartIndex, setEditPartIndex] = useState();
  const [showAddPart, setShowAddPart] = useState(false);

  const maintainenaceInputChange = (event) => {
    const { name, value } = event.target;
    setMaintenance({ ...maintenance, [name]: value });
  };

  useEffect(() => {
    if (!showMachineList && !machine) {
      navigate('/dashboard');
    }
  }, [showMachineList, navigate, machine]);

  useEffect(() => {
    if (machine) {
      setPartList(machine.partList);
    }
  }, [machine]);

  useEffect(() => {
    setMaintenance({ ...maintenance, partsReplaced: selectedPartDisplay });
  // eslint-disable-next-line
  }, [selectedPartDisplay]);

  const availablePartsList = (
    partList ? partList.map((part) => {
      return (
        <Dropdown.Item 
          key={part.id}
          onClick={() => {
            setSelectedPartDisplay([ ...selectedPartDisplay, part]);
          }}
        >
          {part.name}
        </Dropdown.Item>
      )
    })
    :
    <Dropdown.Item className='text-danger'>
      <FontAwesomeIcon icon={faTriangleExclamation} className='pe-2' />
      Error fetching part list!!!
    </Dropdown.Item>
  );

  const updateParts = (event, index) => {
    const { value, name } = event.target;
    let tempSelectedPart = [ ...selectedPartDisplay ];
    let tempPart = { ...selectedPartDisplay[index] };
    tempPart[name] = value;
    tempSelectedPart[index] = tempPart;
    setSelectedPartDisplay(tempSelectedPart);
  }

  const selectedParts = ( 
    <Table striped bordered>
      <thead>
        <tr className='border-bottom'>
          <th>Name</th>
          <th>Quantity</th>
          <th>Specification</th>
          <th></th>
        </tr>
      </thead>
      { selectedPartDisplay &&
        <tbody>
          {
            selectedPartDisplay.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>
                    {
                      editPartIndex === index ?
                      (
                        <Row>
                          <Col>
                            <Form.Group as={Col}>
                              <InputGroup>
                                <FormControl
                                  required
                                  autoComplete="off"
                                  type="number"
                                  name="quantity"
                                  onChange={(e) => updateParts(e, index)}
                                  placeholder={data.quantity}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Button
                              variant='primary' 
                              className='me-3'
                              onClick={() => {
                                setEditPartIndex();
                              }}
                            >
                              <FontAwesomeIcon icon={faFloppyDisk} />
                            </Button>
                          </Col>
                        </Row>
                      )
                      :
                      (
                        <Row>
                          <Col className='text-start'>
                            {data.quantity} 
                          </Col>
                          <Col>
                            <Button
                              variant='primary' 
                              className='me-3 text-end'
                              onClick={() => {
                                setEditPartIndex(index);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </Col>
                        </Row>
                      )
                    }
                  </td>
                  <td>{data.specification}</td>
                  <td>
                    {
                      (editPartIndex !== index) &&
                      <Button
                        variant='danger'
                        onClick={() => {
                          setSelectedPartDisplay(
                            selectedPartDisplay.filter((element, ind) => ind !== index)
                          )
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      }
    </Table>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const url = API_URL + '/user/recordNewMaintenance?machineId=' + machine.id;
    axios.post(url, maintenance)
    .then((resposnse) => {
      console.log(resposnse.data);
      setError(null);
      setSuccess(true);
      setShow(false);
      resetForm();
    })
    .catch((err) => {
      setError(err.message);
      setSuccess(false);
      setShow(true);
      resetForm();
    });
  }

  const resetForm = () => {
    setMaintenance(initialMantenance);
    setSelectedPartDisplay([]);
  };

  return (
    <Container fluid className='mb-5'>
      <Row className="justify-content-md-center mt-4">
        <Col lg={10}>
          {show && success && (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              New maintenance record added successfully!!!
            </Alert>
          )}
          {show && error && (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              {error}
            </Alert>
          )}
          <Card>
            <Card.Header className="text-center fs-4">
              Enter detail information for this service?
            </Card.Header>
            <Card.Body>
              <Form className="mt-3">
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faFileClipboard} className='me-2' /> Details
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="maintenanceDetail"
                      value={maintenance.maintenanceDetail}
                      onChange={maintainenaceInputChange}
                      placeholder="Enter details"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faHashtag} className='me-2' /> Quantity
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="number"
                      name="quantity"
                      value={maintenance.quantity}
                      onChange={maintainenaceInputChange}
                      placeholder="Enter the quantity"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faCircleInfo} className='me-2' /> Remarks
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="remarks"
                      value={maintenance.remarks}
                      onChange={maintainenaceInputChange}
                      placeholder="Enter the remarks"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text className='me-2'>
                      <FontAwesomeIcon icon={faWrench} className='me-2' /> Parts
                    </InputGroup.Text>
                    <Dropdown>
                      <Dropdown.Toggle className='dropdown_headers'>
                        Select Parts from Available list
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {availablePartsList}
                      </Dropdown.Menu>
                    </Dropdown>
                    <InputGroup.Text className='mx-2'>
                      OR
                    </InputGroup.Text>
                    <Button variant='secondary' onClick={() => setShowAddPart(true)}>
                      Add new part
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <div className='selected_parts'>
                      {selectedParts}
                    </div>
                  </InputGroup>
                </Form.Group>
                <input 
                  type="submit" 
                  style={{display: "none"}} 
                  disabled 
                />
              </Form>
            </Card.Body>
            <Card.Footer className="py-3" style={{ textAlign: "right" }}>
              <Button
                className="me-3"
                size="sm"
                type="button"
                variant="success"
                onClick={(e) => onSubmit(e)}
                disabled={
                  maintenance.maintenanceDetail.length === 0
                }
              >
                <FontAwesomeIcon icon={faUpload} /> Submit
              </Button>
              <Button
                size="sm"
                type="button"
                variant="info"
                onClick={() => resetForm()}
                disabled={
                  maintenance.maintenanceDetail.length === 0 &&
                  maintenance.remarks.length === 0
                }
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
          {
            showMachineList && 
            <SelectMachineModal 
              show={showMachineList} 
              setShow={setShowMachineList}
              setMachine={setMachine}
            />
          }
          {
            showAddPart &&
            <AddNewPartModal
              show={showAddPart}
              setShow={setShowAddPart}
              selectedParts={selectedPartDisplay}
              setSelectedParts={setSelectedPartDisplay}
              maintenance={maintenance}
              setMaintenance={setMaintenance}
            />
          }
        </Col>
      </Row>
    </Container>
  );
}

export default AddMaintenance;