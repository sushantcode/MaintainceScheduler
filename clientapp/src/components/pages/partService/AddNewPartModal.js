import { faCircleInfo, faFileClipboard, faHashtag, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Card, Col, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';

const AddNewPartModal = ({
  show, 
  setShow, 
  selectedParts, 
  setSelectedParts, 
  maintenance, 
  setMaintenance
}) => {

  const initialPart = {
    name: '',
    quantity: '',
    specification: ''
  }

  const [part, setPart] = useState(initialPart);

  const inputChange = (event) => {
    const { name, value } = event.target;
    setPart({ ...part, [name]: value });
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        Enter information for new part?
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
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
                        onChange={inputChange}
                        placeholder="Enter a quantity"
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
          onClick={() => {
            setSelectedParts([ ...selectedParts, part]);
            setMaintenance({ ...maintenance, partsReplaced: selectedParts });
            setShow(false);
          }}
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
  )
}

export default AddNewPartModal;