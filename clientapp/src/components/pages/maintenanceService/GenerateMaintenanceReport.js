import { faCalendarMinus, faCalendarPlus, faUndo, faUpload, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import download from 'downloadjs';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';
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
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fromDate, setFromDate] = useState(currDate);
  const [toDate, setToDate] = useState(currDate);

  useEffect(() => {
    if (!showMachineList && !machine) {
      navigate('/dashboard');
    }
  }, [showMachineList, navigate, machine]);

  const onSubmit = () => {
    const url = API_URL + 
                '/user/generatePdf?machineId=' + machine.id + 
                '&from=' + fromDate.toISOString() + 
                '&to=' + toDate.toISOString();
    axios.get(url, {
      responseType: 'blob'
    })
    .then((resposnse) => {
      const content = resposnse.headers["content-type"];
      const fileName = "maintenance_" + 
                      fromDate.getUTCFullYear().toString() + "-" +
                      (fromDate.getUTCMonth() + 1).toString() + "-" +
                      fromDate.getUTCDate().toString() + "_" +
                      toDate.getUTCFullYear().toString() + "-" +
                      (toDate.getUTCMonth() + 1).toString() + "-" +
                      toDate.getUTCDate().toString();
      setError(null);
      setSuccess(true);
      setShow(true);
      download(resposnse.data, fileName, content)
      resetForm();
    })
    .catch((err) => {
      setError(err.message);
      setShow(true);
      setSuccess(false);
      resetForm();
    });
  }

  const resetForm = () => {
    setFromDate(currDate);
    setToDate(currDate);
  };

  return (
    <Row className="justify-content-md-center mt-4">
      <Col lg={6}>
        {show && success && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            Requested report is downloaded successfully!!!
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
                      <FontAwesomeIcon icon={faWrench} className='me-2' /> Selected Machine
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="from"
                      value={machine ? machine.name : ''}
                      disabled
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faCalendarPlus} className='me-2' /> Report From
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="date"
                      name="from"
                      value={fromDate.toISOString().substring(0, 10)}
                      onChange={(e) => setFromDate(new Date(e.target.value))}
                      placeholder={"sd"}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faCalendarMinus} className='me-2' /> Report To
                    </InputGroup.Text>
                    <FormControl
                      required
                      autoComplete="off"
                      type="date"
                      name="to"
                      value={toDate.toISOString().substring(0, 10)}
                      onChange={(e) => setToDate(new Date(e.target.value))}
                      placeholder={"toDate.substring(0, 10)"}
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
                onClick={() => onSubmit()}
                disabled={
                  fromDate.getTime() >= toDate.getTime()
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
                  fromDate.getTime() === currDate.getTime() &&
                  toDate.getTime() === currDate.getTime()
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