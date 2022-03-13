import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Table } from 'react-bootstrap';
import { 
  faPenToSquare, 
  faPlusCircle,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MachineUpdateModal from './MachineUpdateModal';
import PartActionModal from './PartActionModal';
import MessageToaster from '../../utils/MessageToaster';
import AuthenticationService, { API_URL } from '../../utils/AuthenticationService';

const MachineDetails = (props) => {
  const [machine, setMachine] = useState(props.data);
  const [show, setShow] = useState(false);
  const [partActionShow, setPartActionShow] = useState(false);
  const [what, setWhat] = useState('');
  const [selectPart, setSelectPart] = useState();
  const [successDelete, setSuccessDelete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState();
  const [confirmAction, setConfirmAction] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function reloadPage() {
    window.location.reload();
  }

  useEffect(() => {
    setMachine(props.data);
  }, [props]);

  useEffect(() => {
    if (confirmAction) {
      removeMachine();
    }
    return () => {
      setConfirmAction(false);
      props.getMachines();
    }
  // eslint-disable-next-line
  }, [confirmAction]);

  function removeMachine() {
    const url = API_URL + '/admin/removeMachine?machineId=' + machine.id;
    AuthenticationService.Axios().delete(url)
    .then(() => {
      setSuccessDelete(true);
      setError();
      setShowToast(true);
      setShowDeleteModal(false);
      setProcessing(false);
      reloadPage();
    })
    .catch((err) => {
      setSuccessDelete(false);
      setError(err.message);
      setShowToast(true);
      setShowDeleteModal(false);
      setProcessing(false);
    });
  };

  let confirmationModal = (
    <Modal
      show={showDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={() => {
        setShowDeleteModal(false);
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
            setShowDeleteModal(false);
          }}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <Table borderless>
        <tbody>
          <tr>
            <td>
              <Button 
                className='fs-6 fw-bold' 
                onClick={() => {
                  setShow(true)
                  setWhat('updateInfo');
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                Edit
              </Button>
            </td>
            <td>
              <Button 
                className='fs-6 fw-bold me-4'
                onClick={() => {
                  setShow(true)
                  setWhat('addNewPart');
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} className='pe-2' />
                Add New Part
              </Button>
              {
                (AuthenticationService.getLoggedInUserRole() === 'ADMIN') &&
                <Button 
                  className='fs-6 fw-bold'
                  variant='danger'
                  onClick={() => setShowDeleteModal(true)}
                >
                  <FontAwesomeIcon icon={faTrashCan} className='pe-2' />
                  Remove Machine
                </Button>
              }
            </td>
          </tr>
          <tr>
            <td>
              Name : 
            </td>
            <td>
              {machine.name}
            </td>
          </tr>
          <tr>
            <td>
              Location : 
            </td>
            <td>
              {machine.location}
            </td>
          </tr>
          <tr>
            <td>
              Specification : 
            </td>
            <td>
              {machine.specification}
            </td>
          </tr>
          <tr>
            <td>
              Parts : 
            </td>
            <td>
              <ListGroup variant='flush'>
                {
                  machine.partList ? 
                  machine.partList.map((part) => {
                    return (
                    <ListGroup.Item key={part.id} className='mb-3'>
                      Name : {part.name}<br />
                      Quantity : {part.quantity}<br />
                      Specification : {part.specification}<br />
                      <Button 
                        className='fs-6 fw-bold me-4 mt-3'
                        variant='secondary'
                        onClick={() => {
                          setWhat('delete');
                          setSelectPart(part);
                          setPartActionShow(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} className='pe-2' />
                        Remove
                      </Button>
                      <Button 
                        className='fs-6 fw-bold mt-3'
                        variant='secondary'
                        onClick={() => {
                          setWhat('update');
                          setSelectPart(part);
                          setPartActionShow(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className='pe-2' />
                        Edit
                      </Button>
                    </ListGroup.Item>
                    )
                  })
                  :
                  ''
                }
              </ListGroup>
              
            </td>
          </tr>
        </tbody>
      </Table>
      {
        show && 
        <MachineUpdateModal 
          data={machine} 
          what={what} 
          show={show} 
          setShow={setShow} 
          setUpdated={props.setUpdated} />
      }
      {
        partActionShow &&
        <PartActionModal
          data={selectPart}
          what={what}
          partActionShow={partActionShow}
          setPartActionShow={setPartActionShow}
          machineId={machine.id}
          setUpdated={props.setUpdated}
          showToast={showToast}
          setShowToast={setShowToast}
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      }
      {
        showToast &&
        <MessageToaster
          show={showToast}
          setShow={setShowToast}
          variant={
            toastMessage === "Removed the part succeffully" ?
            "success"
            :
            "danger"
          }
          message={toastMessage}
        />
      }
      {
        successDelete &&
        <MessageToaster
          show={showToast}
          setShow={setShowToast}
          variant={
            successDelete ?
            "success"
            :
            "danger"
          }
          message={
            successDelete ?
            "Successfully deleted the machine"
            :
            (error ? error : "Could not remove the machine!!!")
          }
        />
      }
      { confirmationModal }
    </>
  )
}

export default MachineDetails;