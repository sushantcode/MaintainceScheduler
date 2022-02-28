import { 
  faCircleInfo, 
  faFileClipboard, 
  faHashtag, 
  faUndo, 
  faUpload, 
  faWrench,
  faTriangleExclamation
} 
from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Dropdown, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';
import './Maintenance.css';
import SelectMachineModal from './SelectMachineModal';

const AddMaintenance = () => {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const initialMantenance = {
    maintenanceDetail: '',
    partsReplaced: {},
    quantity: '1',
    remarks: '',
    date: ''
  };
  
  const [maintenance, setMaintenance] = useState(initialMantenance);
  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [selectedPartDisplay, setSelectedPartDisplay] = useState([]);
  const [partList, setPartList] = useState();
  const [showMachineList, setShowMachineList] = useState(true);
  const [machine, setMachine] = useState();
  // const [errorPartList, setErrorPartList] = useState();

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
    console.log(selectedPartDisplay);
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

  const updatePartsQuantity = (event) => {
    const { value } = event.target;
    console.log(value)
    //selectedPartDisplay(tempSelectedPart);
  }

  const selectedParts = (
    <Table borderless>
      <thead>
        <tr className='border-bottom'>
          <th>Name</th>
          <th>Quantity</th>
          <th>Specification</th>
        </tr>
      </thead>
      <tbody>
        {
          selectedPartDisplay ? selectedPartDisplay.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.name}</td>
                <td>
                  <Form.Group as={Col}>
                    <InputGroup>
                      <FormControl
                        required
                        autoComplete="off"
                        type="number"
                        name="name"
                        onChange={updatePartsQuantity}
                        placeholder={data.quantity}
                      />
                    </InputGroup>
                  </Form.Group>
                </td>
                <td>{data.specification}</td>                
              </tr>
            )
          })
          :
          ''
        }
      </tbody>
    </Table>
  );

  const onSubmit = () => {
    console.log(maintenance);
    // axios.post(API_URL + '/user/addNewMachine', machine)
    // .then((resposnse) => {
    //   console.log(resposnse.data);
    //   setError(null);
    //   setSuccess(true);
    //   setShow(false);
    //   resetForm();
    // })
    // .catch((err) => {
    //   setError(err.message);
    //   setSuccess(false);
    //   setShow(true);
    //   resetForm();
    // });
  }

  const resetForm = () => {
    setMaintenance(initialMantenance);
  };

  return (
    <Row className="justify-content-md-center mt-4">
      <Col lg={7}>
        {success && (
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
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCircleInfo} className='me-2' /> Date
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="date"
                    name="date"
                    value={maintenance.date}
                    onChange={maintainenaceInputChange}
                    placeholder={(new Date().getDate().toString())}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
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
              onClick={() => onSubmit()}
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
                maintenance.remarks.length === 0 &&
                maintenance.date.length === 0
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
      </Col>
    </Row>
  );
}

export default AddMaintenance;