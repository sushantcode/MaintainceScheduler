import { faCalendarMinus, faCalendarPlus, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Modal, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';

const AppUsages = () => {  
  let navigate = useNavigate();

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const currDate = new Date();

  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [fromDate, setFromDate] = useState(currDate);
  const [toDate, setToDate] = useState(currDate);
  const [data, setData] = useState();

  const resetForm = () => {
    setFromDate(currDate);
    setToDate(currDate);
  };

  useEffect(() => {
    if (!show && (fromDate.getTime() > toDate.getTime())) {
      navigate('/admin');
    }
    else if (!show && (fromDate.getTime() <= toDate.getTime())) {
      getAppUsages();
    }
  // eslint-disable-next-line
  }, [show, fromDate, toDate, navigate]);

  const getAppUsages = () => {
    console.log(fromDate, toDate);
    const from = new Date(fromDate);
    const to = new Date(toDate);
    from.setDate(from.getDate() - 1);
    to.setDate(to.getDate() + 1);
    const url = API_URL + 
                '/admin/getAppActivities?' +
                'from=' + from.toISOString() + 
                '&to=' + to.toISOString();
    axios.get(url)
    .then((response) => {
      if (Array.isArray(response.data)) {
        setData(response.data); 
        setError(null);
      }
      else {
        setError("Response received is not an array");
        setData();
      }
    })
    .catch((err) => {
      setData();
      console.log(err.message);
      setError(err.message);
    })
  };

  let DateInputModal = (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header>
        Select the range of dates?
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-3">
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
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button
        className="me-3"
        size="sm"
        type="button"
        variant="success"
        onClick={() => setShow(false)}
        disabled={
          fromDate.getTime() > toDate.getTime()
        }
      >
        <FontAwesomeIcon icon={faCheck} /> OK
      </Button>
      <Button
        size="sm"
        type="button"
        variant="info"
        onClick={() => resetForm()}
      >
        <FontAwesomeIcon icon={faUndo} /> Reset
      </Button>
      </Modal.Footer>
    </Modal>
  )
  return (
    <Container>
      <Row className='mb-5 mt-5'>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Route</th>
                <th>Username</th>
                <th>Date</th>
              </tr>
            </thead>
            {
              data &&
              <tbody>
                {
                  data.map((element, index) => {
                    return (
                      <tr key={element.id}>
                        <td>{index + 1}</td>
                        <td>{element.route}</td>
                        <td>{element.username}</td>
                        <td>{element.date}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            }
          </Table>
        </Col>
      </Row>
      {
        show && DateInputModal
      }
    </Container>
  )
}

export default AppUsages;