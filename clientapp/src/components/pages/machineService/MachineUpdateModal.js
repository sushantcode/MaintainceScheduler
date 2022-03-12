import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { 
  faFileClipboard, 
  faLocationArrow, 
  faCircleInfo,
  faUpload,
  faUndo,
  faHashtag
} from '@fortawesome/free-solid-svg-icons';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';

const MachineUpdateModal = (props) => {
  const initialMachine = { ...props.data };

  const initialPart = {
    name: '',
    quantity: "1",
    specification: ''
  };

  const [machine, setMachine] = useState(initialMachine);
  const [part, setPart] = useState(initialPart);
  const [error, setError] = useState();
  const [errorShow, setErrorShow] = useState(false);

  const machineInputChange = (event) => {
    const { name, value } = event.target;
    setMachine({ ...machine, [name]: value });
  };

  const partInputChange = (event) => {
    const { name, value } = event.target;
    setPart({ ...part, [name]: value });
  };

  const onMachineInfoSubmit = (e) => {
    e.preventDefault();
    AuthenticationService.Axios().put(API_URL + '/user/updateMachine', machine)
    .then((response) => {
      if (response.status === 200) {
        setError(null);
        props.setUpdated(true);
        props.setShow(false);
      }
      else {
        setError(response.message);
        setErrorShow(true);
      }
    })
    .catch((err) => {
      setError(err.message);
      setErrorShow(true);
    });
  };

  const onPartInfoSubmit = (e) => {
    e.preventDefault();
    const url = API_URL + '/user/addMachinePart?machineId=' + machine.id;
    AuthenticationService.Axios().post(url, part)
    .then((resposnse) => {
      console.log(resposnse.data);
      setError(null);
      props.setUpdated(true);
      setPart(initialPart);
      props.setShow(false);
    })
    .catch((err) => {
      setError(err.message);
      setErrorShow(true);
    });
  }

  let resturnValue = props.what === 'updateInfo' ?
  (
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
        Enter new machine information?
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            {
              errorShow && error && 
              <Alert variant="danger" onClose={() => setErrorShow(false)} dismissible>
                {error}
              </Alert>
            }
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group as={Col} className="mb-2">
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
                        placeholder={props.data.name}
                      />
                    </InputGroup>
                    {
                      (machine.name.length === 0) &&
                      <Form.Text className='text-danger' muted>
                        <span className='text-danger'>Must provide the name</span>
                      </Form.Text>
                    }
                  </Form.Group>
                  <Form.Group as={Col} className="mb-2">
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
                        placeholder={props.data.location}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-2">
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
                        placeholder={props.data.specification}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="me-3"
          size="sm"
          type="button"
          variant="success"
          onClick={(e) => onMachineInfoSubmit(e)}
          disabled={
            !machine ||
            machine.name.length === 0
          }
        >
          <FontAwesomeIcon icon={faUpload} /> Submit
        </Button>
        <Button
          size="sm"
          type="button"
          variant="info"
          onClick={() => setMachine(initialMachine)}
          disabled={
            !machine
          }
        >
          <FontAwesomeIcon icon={faUndo} /> Reset
        </Button>
      </Modal.Footer>
    </Modal>
  )
  :
  (
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
        Enter information for new part?
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            {
              errorShow && error && 
              <Alert variant="danger" onClose={() => setErrorShow(false)} dismissible>
                {error}
              </Alert>
            }
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group as={Col} className="mb-2">
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileClipboard} />
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={part.name}
                        onChange={partInputChange}
                        placeholder="Enter a name"
                      />
                    </InputGroup>
                    {
                      (part.name.length === 0) &&
                      <Form.Text className='text-danger' muted>
                        <span className='text-danger'>Must provide the name</span>
                      </Form.Text>
                    }
                  </Form.Group>
                  <Form.Group as={Col} className="mb-2">
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faHashtag} />
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="number"
                        name="quantity"
                        value={part.quantity}
                        onChange={partInputChange}
                        placeholder={1}
                      />
                    </InputGroup>
                    {
                      (part.quantity.length === 0 || parseInt(part.quantity) < 1) &&
                      <Form.Text className='text-danger' muted>
                        <span className='text-danger'>Quantity must be 1 or greater</span>
                      </Form.Text>
                    }
                  </Form.Group>
                  <Form.Group as={Col} className="mb-2">
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="specification"
                        value={part.specification}
                        onChange={partInputChange}
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
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="me-3"
          size="sm"
          type="button"
          variant="success"
          onClick={(e) => onPartInfoSubmit(e)}
          disabled={
            part.name.length === 0 ||
            part.quantity.length === 0 ||
            parseInt(part.quantity) < 1
          }
        >
          <FontAwesomeIcon icon={faUpload} /> Submit
        </Button>
        <Button
          size="sm"
          type="button"
          variant="info"
          onClick={() => setPart(initialPart)}
          disabled={
            part.name.length === 0 &&
            part.quantity.length === 0 &&
            part.specification.length === 0
          }
        >
          <FontAwesomeIcon icon={faUndo} /> Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return resturnValue;
}

export default MachineUpdateModal;