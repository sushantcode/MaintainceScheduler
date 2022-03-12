import { faEdit, faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';

const AvailablePartsTable = (props) => {

  return (
    <Table striped bordered>
      <thead>
        <tr className='border-bottom'>
          <th>Name</th>
          <th>Quantity</th>
          <th>Specification</th>
          <th></th>
        </tr>
      </thead>
      { props.selectedPartDisplay &&
        <tbody>
          {
            props.selectedPartDisplay.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>
                    {
                      props.editPartIndex === index ?
                      (
                        <Row>
                          <Col>
                            <Form.Group as={Col}>
                              <InputGroup>
                                <FormControl
                                  required
                                  autoComplete="off"
                                  type="number"
                                  name="quantity"
                                  onChange={(e) => props.updateParts(e, index)}
                                  placeholder={data.quantity}
                                />
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Button
                              variant='primary' 
                              className='me-3'
                              onClick={() => {
                                props.setEditPartIndex();
                              }}
                            >
                              <FontAwesomeIcon icon={faFloppyDisk} />
                            </Button>
                          </Col>
                        </Row>
                      )
                      :
                      (
                        <Row>
                          <Col className='text-start'>
                            {data.quantity} 
                          </Col>
                          <Col>
                            <Button
                              variant='primary' 
                              className='me-3 text-end'
                              onClick={() => {
                                props.setEditPartIndex(index);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </Col>
                        </Row>
                      )
                    }
                  </td>
                  <td>{data.specification}</td>
                  <td>
                    {
                      (props.editPartIndex !== index) &&
                      <Button
                        variant='danger'
                        onClick={() => {
                          props.setSelectedPartDisplay(
                            props.selectedPartDisplay.filter((element, ind) => ind !== index)
                          )
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      }
    </Table>
  )
}

export default AvailablePartsTable;