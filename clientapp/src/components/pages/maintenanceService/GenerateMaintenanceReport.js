import { faCalendarMinus, faCalendarPlus, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../../utils/AuthenticationService';
import SelectMachineModal from './SelectMachineModal';

const GenerateMaintenanceReport = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const currDate = new Date();

  const [showMachineList, setShowMachineList] = useState(true);
  const [machine, setMachine] = useState();
  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [fromDate, setFromDate] = useState(currDate);
  const [toDate, setToDate] = useState(currDate);

  useEffect(() => {
    if (!showMachineList && !machine) {
      navigate('/dashboard');
    }
  }, [showMachineList, navigate, machine]);

  const resetForm = () => {
    setFromDate(currDate);
    setToDate(currDate);
  };

  return (
    <Row className="justify-content-md-center mt-4">
      <Col lg={10}>
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
                      <FontAwesomeIcon icon={faCalendarPlus} className='me-2' /> From
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="date"
                      name="from"
                      value={fromDate}
                      onChange={(e) => setFromDate(new Date(e.target.value))}
                      placeholder={fromDate}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faCalendarMinus} className='me-2' /> To
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="date"
                      name="to"
                      value={toDate}
                      onChange={(e) => setToDate(new Date(e.target.value))}
                      placeholder={toDate}
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer className="py-3" style={{ textAlign: "right" }}>
              <Button
                className="me-3"
                size="sm"
                type="button"
                variant="success"
                onClick={() => console.log(fromDate.toISOString(), toDate)}
                disabled={
                  fromDate.length === 0 ||
                  toDate.length === 0
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
                  fromDate.length === 0 &&
                  toDate.length === 0
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
  )
}

export default GenerateMaintenanceReport;