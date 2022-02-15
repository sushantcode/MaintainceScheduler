import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import AuthenticationService from './AuthenticationService';

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
        <Link className='nav-link me-4' araia-aria-current="page" to={"admin"}>
          Admin Portal
        </Link>
      }
      <Link className='nav-link me-4' araia-aria-current="page" to={"profile"}>
        <Button variant='primary' onClick="this.blur()">
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
    <Navbar bg='dark' variant='dark'>
      <Link className="navbar-brand ms-3" to={"/"}>
        <img src="/logo.png" alt="logo" style={{maxHeight: 75}}/>
      </Link>
      <div className='me-auto'></div>
      <Nav className='navbar-right me-4 fs-5'>
        {
          AuthenticationService.isUserLoggedIn() ? 
          authorizedLinks
          :
          unAuthorizedLinks
        }
        
      </Nav>
    </Navbar>
  );
};

export default NavMenu;
