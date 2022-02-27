import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from '../utils/AuthenticationService';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { 
        faScrewdriverWrench, 
        faPenToSquare, 
        faPlusCircle,
        faListCheck,
  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  let navigate = useNavigate();

  let isloggedIn = AuthenticationService.isUserLoggedIn();

  useEffect(() => {
    if (!isloggedIn) {
      navigate('/login');
    }
  }, [isloggedIn, navigate]);

  return (
    <Container className='mb-5'>
      <Row className='mb-4 mt-4'>
        <Col className='border text-center'>
          <Button variant='outline-secondary' className='fw-bold fs-2 my-4'>
            <FontAwesomeIcon icon={faScrewdriverWrench} className="pe-3" />
            Record New Service
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className='border mb-5'>
          <Row>
            <Col className='text-center mt-5'>
              <Button variant='outline-secondary' className='fw-bold fs-4 py-3'>
                <div className='fs-1'>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <span className='fs-5'>
                  Edit Maintenance Record
                </span>
              </Button>
            </Col>
          </Row>
          <Row className='mb-5'>
            <Col className='text-center mt-5'>
              <Button variant='outline-secondary' className='fw-bold fs-4 py-3'>
                <div className='fs-1'>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
                <span className='fs-5'>
                  Add New Machine
                </span>
              </Button>
            </Col>
            <Col className='text-center mt-5'>
              <Link to={"manageMachine"}>
                <Button variant='outline-secondary' className='fw-bold py-3' >
                  <div className='fs-1'>
                    <FontAwesomeIcon icon={faListCheck} />
                  </div>
                  <span className='fs-5'>
                    Manage Machine Info
                  </span>
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard;