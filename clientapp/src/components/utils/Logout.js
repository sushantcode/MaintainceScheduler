import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from './AuthenticationService'

const Logout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (AuthenticationService.isUserLoggedIn()) {
      navigate("/dashboard");
    }
  })

  return (
    <div className='text-center mt-5'>
      You are logged out successfully. See you again!
    </div>
  )
}

export default Logout