import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import AuthenticationService from './AuthenticationService';
import '../../css/NavMenu.css';

const NavMenu = () => {
  // eslint-disable-next-line
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  let isloggedIn = AuthenticationService.isUserLoggedIn();

  useEffect(() => {
    if (isloggedIn) {
      setUsername(AuthenticationService.getLoggedInUsername());
      setRole(AuthenticationService.getLoggedInUserRole());
    }
  }, [isloggedIn]);

  const authorizedLinks = (
    <>
      <Link className='nav-link me-4' araia-aria-current="page" to={"dashboard"}>
        Dashboard
      </Link>
      {
        (role === "ADMIN") &&
        <Link className='nav-link me-4' araia-aria-current="page" to="/admin">
          Admin Portal
        </Link>
      }
      <Link className='nav-link' araia-aria-current="page" to="/profile">
        <Button variant='primary'>
          Signed In: {username}
        </Button>
      </Link>
    </>
  );

  const unAuthorizedLinks = (
    <Link className="nav-link" aria-current="page" to={"login"}>
      <FontAwesomeIcon icon={faSignInAlt} /> Login
    </Link>
  );
  
  return (
    <Navbar bg='dark' variant='dark' expand="md">
      <Container>
        <Navbar.Brand className='me-auto'>
          <Link className="navbar-brand" to={"/"}>
            <img src="/logo.png" alt="logo" style={{maxHeight: 75}}/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='navbar-right ms-auto fs-5'>
            {
              AuthenticationService.isUserLoggedIn() ? 
              authorizedLinks
              :
              unAuthorizedLinks
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
