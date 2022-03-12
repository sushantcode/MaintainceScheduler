import { faCalendar, faCircleInfo, faFileClipboard, faHashtag, faTriangleExclamation, faUndo, faUpload, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Dropdown, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';
import AddNewPartModal from '../partService/AddNewPartModal';
import AvailablePartsTable from './AvailablePartsTable';
import SelectMachineModal from './SelectMachineModal';

const EditMaintenance = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);
  
  const [initialMantenance, setinitialMaintenace] = useState();
  const [maintenance, setMaintenance] = useState();
  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [selectedPartDisplay, setSelectedPartDisplay] = useState([]);
  const [partList, setPartList] = useState();
  const [showMachineList, setShowMachineList] = useState(true);
  const [machine, setMachine] = useState();
  const [date, setDate] = useState('');
  const [maintenanceList, setMaintenanceList] = useState();
  const [showMaintenanceTable, setShowMaintenanceTable] = useState(false);
  const [editPartIndex, setEditPartIndex] = useState();
  const [showAddPart, setShowAddPart] = useState(false);

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
    if (date !== '') {
      getMaintenanceList();
    }
  // eslint-disable-next-line
  }, [date]);

  const getMaintenanceList = () => {
    const mDate = date + 'T06:00:00.000Z';
    const url = API_URL + 
                '/user/getMaintenanceRecordByDate?machineId=' + machine.id + 
                '&date=' + mDate;
    axios.get(url)
    .then((resposnse) => {
      setError(null);
      setMaintenanceList(resposnse.data);
    })
    .catch((err) => {
      setError(err.message);
    });
  };

  useEffect(() => {
    if (selectedPartDisplay.length !== 0) {
      setMaintenance({ ...maintenance, partsReplaced: selectedPartDisplay });
    }
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

  const onSubmit = (e) => {
    e.preventDefault();
    const url = API_URL + '/user/updateMaintenance';
    axios.put(url, maintenance)
    .then((response) => {
      if (response.status === 200) {
        setError(null);
        setSuccess(true);
      }
      else {
        setError(response.message);
        setSuccess(false);
      }
    })
    .catch((err) => {
      setError(err.message);
      setSuccess(false);
    });
  }

  const maintainenaceInputChange = (event) => {
    const { name, value } = event.target;
    setMaintenance({ ...maintenance, [name]: value });
  };

  const resetForm = () => {
    setMaintenance(initialMantenance);
    setSelectedPartDisplay(initialMantenance.partsReplaced);
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
              Enter updated information for the service?
            </Card.Header>
            <Card.Body>
              <Form className="mt-3">
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faWrench} className='me-2' /> Selected Machine
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="from"
                      value={machine ? machine.name : ''}
                      readOnly
                      disabled
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faCalendar} className='me-2' /> Select Maintenance Date ?
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      aria-describedby='date'
                      type="date"
                      name="from"
                      value={date}
                      onChange={(e) => {
                          setDate(e.target.value);
                          setShowMaintenanceTable(true);
                        }
                      }
                      disabled={date !== ''}
                    />
                  </InputGroup>
                  {
                    (date === '') &&
                    <Form.Text id='date' muted>
                      <span className='text-danger'>Must select a date</span>
                    </Form.Text>
                  }
                </Form.Group>
                
                {
                  showMaintenanceTable &&
                  <>
                    <Form.Group as={Col} className="mb-3">
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faWrench} className='me-2' /> 
                          Select the maintenance record you want to update?
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>S.N.</th>
                          <th>Details</th>
                          <th>Date</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      {
                        maintenanceList &&
                        <tbody>
                          {
                            maintenanceList.map((element, index) => {
                              return (
                                <tr 
                                  key={element.id}
                                  style={{cursor: "pointer"}} 
                                  onClick={() => {
                                    setinitialMaintenace(element);
                                    setMaintenance(element);
                                    setSelectedPartDisplay(element.partsReplaced);
                                    setShowMaintenanceTable(false);
                                  }
                                }>
                                  <td>{index + 1}</td>
                                  <td>{element.maintenanceDetail}</td>
                                  <td>{element.date}</td>
                                  <td>{element.remarks}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      }
                    </Table>
                  </>
                }
                {
                  maintenance && !showMaintenanceTable &&
                  <>
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
                      {
                        (maintenance.maintenanceDetail.length === 0) &&
                        <Form.Text className='text-danger' muted>
                          <span className='text-danger'>Must provide the detail</span>
                        </Form.Text>
                      }
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
                      {
                        (maintenance.quantity.length === 0 || parseInt(maintenance.quantity) < 1) &&
                        <Form.Text className='text-danger' muted>
                          <span className='text-danger'>Quantity must be 1 or greater</span>
                        </Form.Text>
                      }
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
                          <AvailablePartsTable
                            selectedPartDisplay={selectedPartDisplay}
                            setSelectedPartDisplay={setSelectedPartDisplay}
                            editPartIndex={editPartIndex}
                            updateParts={updateParts}
                            setEditPartIndex={setEditPartIndex}
                          />
                        </div>
                      </InputGroup>
                    </Form.Group>
                  </>
                }
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
                  !initialMantenance ||
                  maintenance.maintenanceDetail.length === 0 ||
                  maintenance.quantity.length === 0 ||
                  parseInt(maintenance.quantity) < 1
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
                  !initialMantenance
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
  )
}

export default EditMaintenance;