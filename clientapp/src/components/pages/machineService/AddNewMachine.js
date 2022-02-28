import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFileClipboard, 
  faLocationArrow, 
  faCircleInfo,
  faUpload,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../../utils/AuthenticationService';
import AuthenticationService from "../../utils/AuthenticationService";

const AddNewMachine = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const initialMachine = {
    name: '',
    location: '',
    specification: ''
  };
  
  const [machine, setMachine] = useState(initialMachine);
  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);

  const machineInputChange = (event) => {
    const { name, value } = event.target;
    setMachine({ ...machine, [name]: value });
  };

  const onSubmit = () => {
    axios.post(API_URL + '/user/addNewMachine', machine)
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
    setMachine(initialMachine);
  };

  return (
    <Row className="justify-content-md-center mt-4">
      <Col lg={7}>
        {success && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            New machine added successfully!!!
          </Alert>
        )}
        {show && error && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>
        )}
        <Card>
          <Card.Header className="text-center fs-4">
            Enter information for machine?
          </Card.Header>
          <Card.Body>
            <Form className="mt-3">
              <Form.Group as={Col} className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faFileClipboard} className='me-2' /> Name
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="name"
                    value={machine.name}
                    onChange={machineInputChange}
                    placeholder="Enter a name"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLocationArrow} className='me-2' /> Location
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="location"
                    value={machine.location}
                    onChange={machineInputChange}
                    placeholder="Enter a location"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCircleInfo} className='me-2' /> Specification
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="specification"
                    value={machine.specification}
                    onChange={machineInputChange}
                    placeholder="Enter a specification"
                  />
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
                machine.name.length === 0
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
                machine.name.length === 0 &&
                machine.location.length === 0 &&
                machine.specification.length === 0
              }
            >
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default AddNewMachine;