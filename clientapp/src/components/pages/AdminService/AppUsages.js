import { faCalendarMinus, faCalendarPlus, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    else if (AuthenticationService.getLoggedInUserRole() === 'USER') {
      navigate('/dashboard')
    }
  }, [navigate]);


  const [error, setError] = useState();
  const [show, setShow] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [data, setData] = useState();

  useEffect(() => {
    if (!show && (fromDate.length === 0 || toDate.length === 0)) {
      navigate('/admin');
    }
  }, [fromDate, toDate, navigate, show])

  const resetForm = () => {
    setFromDate('');
    setToDate('');
  };

  useEffect(() => {
    if (!show && (new Date(fromDate).getTime() >= new Date(toDate).getTime())) {
      navigate('/admin');
    }
    else if (!show && (new Date(fromDate).getTime() <= new Date(toDate).getTime())) {
      getAppUsages();
    }
  // eslint-disable-next-line
  }, [show, fromDate, toDate, navigate]);

  const getAppUsages = () => {
    const from = fromDate + 'T06:00:00.000Z';
    const to = toDate + 'T06:00:00.000Z';
    const url = API_URL + 
                '/admin/getAppActivities?' +
                'from=' + from + 
                '&to=' + to;
    AuthenticationService.Axios().get(url)
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
      <Modal.Header closeButton>
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
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </InputGroup>
            {
              (fromDate === '') &&
              <Form.Text id='fromDateHelp' muted>
                <span className='text-danger'>Must select a date</span>
              </Form.Text>
            }
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
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </InputGroup>
            {
              (toDate === '') &&
              <Form.Text className='text-danger' id='toDateHelp' muted>
                <span className='text-danger'>Must select a date</span>
              </Form.Text>
            }
            {
              (toDate !== '' && 
              (new Date(fromDate).getTime() >= new Date(toDate).getTime())) &&
              <Form.Text className='text-danger' id='toDateHelp' muted>
                <span className='text-danger'> From-date must be the date before to-date </span>
              </Form.Text>
            }
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
          !fromDate || !toDate ||
          (new Date(fromDate).getTime() >= new Date(toDate).getTime())
        }
      >
        <FontAwesomeIcon icon={faCheck} /> OK
      </Button>
      <Button
        size="sm"
        type="button"
        variant="info"
        onClick={() => resetForm()}
        disabled={
          !fromDate && !toDate
        }
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
          {
            error &&
            <h4 className='text-danger text-center'>{error}</h4>
          }
        </Col>
      </Row>
      {
        show && DateInputModal
      }
    </Container>
  )
}

export default AppUsages;