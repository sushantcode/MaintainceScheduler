import { 
  faCircleInfo, 
  faFileClipboard, 
  faHashtag, 
  faUndo, 
  faUpload, 
  faWrench,
  faTriangleExclamation,
  faScrewdriverWrench
} 
from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Dropdown, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';
import './Maintenance.css';
import SelectMachineModal from './SelectMachineModal';
import AddNewPartModal from '../partService/AddNewPartModal';
import AvailablePartsTable from './AvailablePartsTable';

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
  const [submitClicked, setSubmitClicked] = useState(false);
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
            const thisPart = { ...part };
            delete thisPart.id;
            setSelectedPartDisplay([ ...selectedPartDisplay, thisPart]);
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
    setShow(true);
    setSubmitClicked(true);
    e.preventDefault();
    const url = API_URL + '/user/recordNewMaintenance?machineId=' + machine.id;
    AuthenticationService.Axios().post(url, maintenance)
    .then(() => {
      setError(null);
      setSuccess(true);
      setSubmitClicked(false);
      resetForm();
    })
    .catch((err) => {
      setError(err.message);
      setSuccess(false);
      setSubmitClicked(false);
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
          {show && !success && !error && submitClicked && (
            <Alert variant="info" onClose={() => setShow(false)} dismissible>
              Processing request...
            </Alert>
          )}
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
                      <FontAwesomeIcon icon={faScrewdriverWrench} className='me-2' /> Maintenance to Machine
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
                  maintenance.maintenanceDetail.length === 0 &&
                  maintenance.remarks.length === 0 &&
                  selectedPartDisplay !== []
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