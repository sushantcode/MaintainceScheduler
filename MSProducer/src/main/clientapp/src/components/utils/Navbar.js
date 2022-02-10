import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  function onLoginClick(event) {
    event.preventDefault();
    fetch("http://localhost:8080/api/v1/user/listMachine", {
      method: "GET"
    })
    .then(res => res.text())
    .then(result => {
      console.log(result);
    })
  }
  
  return (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Maintenance Scheduler</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Login
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><span className="dropdown-item" onClick={onLoginClick}>Admin</span></li>
                <li><span className="dropdown-item" onClick={onLoginClick}>User</span></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
