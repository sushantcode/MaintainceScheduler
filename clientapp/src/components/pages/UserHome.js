import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../utils/AuthenticationService';

const UserHome = () => {
  let navigate = useNavigate();
  const [machineList, setMachineList] = useState(null);

  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      navigate('/login');
    }
    else if (AuthenticationService.getLoggedInUserRole() === 'ADMIN') {
      navigate('/admin')
    }
  });

  useEffect(() => {
    axios.get(API_URL + '/user/listMachine')
    .then((response) => {
      setMachineList(response.data);
    })
  });

  return (
    <div>
      {machineList ? machineList : "Empty list"}
    </div>
  )
}

export default UserHome;