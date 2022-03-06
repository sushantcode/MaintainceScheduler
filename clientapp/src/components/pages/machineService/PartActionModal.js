import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { 
  faFileClipboard, 
  faCircleInfo,
  faUpload,
  faUndo,
  faHashtag
} from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../utils/AuthenticationService';
import axios from 'axios';

const PartActionModal = (props) => {
  const [confirmAction, setConfirmAction] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState();
  const [errorShow, setErrorShow] = useState(false);

  const initialPart = {
    id: props.data.id,
    name: props.data.name,
    quantity: props.data.quantity,
    specification: props.data.specification
  }

  const [part, setPart] = useState(initialPart);

  useEffect(() => {
    if (confirmAction) {
      deleteMachinePart();
    }
    return () => {
      setConfirmAction(false);
    }
  // eslint-disable-next-line
  }, [confirmAction])

  const deleteMachinePart = () => {
    const url = API_URL + 
                '/user/removeMachinePart?machineId=' + 
                props.machineId + 
                '&partId=' + 
                part.id;
    axios.delete(url)
    .then(() => {
      props.setToastMessage("Removed the part succeffully");
      props.setUpdated();
      setProcessing(false);
      props.setPartActionShow(false);
      props.setShowToast(true);
    })
    .catch((err) => {
      console.log(err.message);
      props.setToastMessage(err.message);
      setProcessing(false);
      props.setPartActionShow(false);
      props.setShowToast(true);
    })
  }

  const inputChange = (event) => {
    const { name, value } = event.target;
    setPart({ ...part, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const url = API_URL + '/user/updatePart';
    axios.put(url, part)
    .then((resposnse) => {
      console.log(resposnse.data);
      setError(null);
      props.setUpdated(true);
      setPart(initialPart);
      props.setPartActionShow(false);
    })
    .catch((err) => {
      setError(err.message);
      setErrorShow(true);
    });
  };

  const returnValue = props.what === 'delete'?
  (
    <>
      <Modal
        show={props.partActionShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
        onHide={() => {
          props.setPartActionShow(false);
        }}
      >
        <Modal.Body>
          <h4>
            {processing ? "Request processing..." : "Do you really want to proceed?"}
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={processing}
            onClick={() => {
                setProcessing(true);
                setConfirmAction(true);
              }}
          >
            Yes
          </Button>
          <Button
            disabled={processing}
            onClick={() => {
              setConfirmAction(false);
              props.setPartActionShow(false);
            }}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
  :
  (
    <Modal
      show={props.partActionShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={() => {
        props.setPartActionShow(false);
      }}
    >
      <Modal.Header closeButton>
        Enter new information for the part?
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
                        onChange={inputChange}
                        placeholder="Enter a name"
                      />
                    </InputGroup>
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
                        onChange={inputChange}
                        placeholder={1}
                      />
                    </InputGroup>
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
                        onChange={inputChange}
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
          onClick={(e) => onSubmit(e)}
          disabled={
            part.name.length === 0
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

  return returnValue;
}

export default PartActionModal;