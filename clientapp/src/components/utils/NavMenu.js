import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import AuthenticationService from './AuthenticationService';
import '../../css/NavMenu.css';

const NavMenu = () => {
  // eslint-disable-next-line
  let navigate = useNavigate();
  let location = useLocation();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [expanded, setExpanded] = useState(false);

  let isloggedIn = AuthenticationService.isUserLoggedIn();

  useEffect(() => {
    if (isloggedIn) {
      setUsername(AuthenticationService.getLoggedInUsername());
      setRole(AuthenticationService.getLoggedInUserRole());
    }
  }, [isloggedIn]);

  const authorizedLinks = (
    <>
      <Link 
        className={`nav-link ${(/\/dashboard\/?.*/i).test(location.pathname) ? 'active' : ''}`} 
        to="/dashboard">
        Dashboard
      </Link>
      {
        (role === "ADMIN") &&
        <Link 
        className={`nav-link ${(/\/admin\/?.*/i).test(location.pathname) ? 'active' : ''}`}
          to="/admin">
          Admin Portal
        </Link>
      } 
      <Link 
        className={`nav-link ${(/\/profile\/?.*/i).test(location.pathname) ? 'active' : ''}`} 
        to="/profile"> 
        Signed In As: {' '}  {username} 
      </Link>
    </>
  );

  const unAuthorizedLinks = (
    <Link className="nav-link" aria-current="page" to={"login"}>
      <FontAwesomeIcon icon={faSignInAlt} /> Login
    </Link>
  );
  
  return (
    <Navbar 
      bg='dark' 
      variant='dark' 
      expand="md" 
      collapseOnSelect={true} 
      expanded={expanded}
      onSelect={() => setExpanded(expanded)}
      onToggle={() => setExpanded(!expanded)} 
    >
      <Container>
        <Navbar.Brand className='me-auto'>
          <Link className="navbar-brand" to={"/"}>
            <img src="/logo.png" alt="logo" style={{maxHeight: 75}}/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ms-auto fs-5 float-end text-end'>
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
