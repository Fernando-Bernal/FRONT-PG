import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const ProtectedAdmin = ({children}) => {
  const { user } = UserAuth()

  switch(user.email){
    case 'luismfalco8@gmail.com':
      return children
    case 'marioelkamui@gmail.com':
      return children
    default:
      return <Navigate to='/'/>
  }

}

export default ProtectedAdmin