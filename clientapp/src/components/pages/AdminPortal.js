import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService, { API_URL } from '../utils/AuthenticationService';
import axios from 'axios';

const AdminPortal = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState(null);

  let isloggedIn = AuthenticationService.isUserLoggedIn();

  useEffect(() => {
    if (!isloggedIn) {
      navigate('/login');
    }
    else if (AuthenticationService.getLoggedInUserRole() === 'USER') {
      navigate('/dashboard')
    }
  }, [isloggedIn, navigate]);

  useEffect(() => {
    axios.get(API_URL + '/admin/listUsers')
    .then((response) => {
      console.log(response.data);
      setUserList(response.data);
    })
  }, []);

  
  return (
    <div>
      jjksd
    </div>
  )
}

export default AdminPortal;