import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const MessageToaster = (props) => {

  return (
    <ToastContainer position='middle-center'>
      <Toast 
        show={props.show} 
        onClose={() => props.setShow(false)} delay={2500} 
        bg={props.variant}
        autohide>
        <Toast.Body className='text-light fs-5'>
          {props.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default MessageToaster;