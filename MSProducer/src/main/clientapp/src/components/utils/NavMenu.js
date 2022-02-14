import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faUserPlus,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';

const NavMenu = () => {
  
  return (
    <Navbar bg='dark' variant='dark'>
      <Link className="navbar-brand ms-3" to={"/"}>
        <img src="/logo.png" alt="logo" style={{maxHeight: 75}}/>
      </Link>
      <div className='me-auto'></div>
      <Nav className='navbar-right me-4 fs-4'>
        <Link className="nav-link active" aria-current="page" to={"login"}>
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Link>
      </Nav>
    </Navbar>
  );
};

export default NavMenu;
