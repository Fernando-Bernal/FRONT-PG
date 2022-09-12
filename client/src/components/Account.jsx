import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Swal from "sweetalert2";

const Account = () => {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      Swal.fire({
        icon: 'success',
        title: 'You logout',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4 text-white'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email: {user && user.email}</p>
      <button onClick={handleLogout} className='px-6 py-2 my-4 mr-4'>Logout</button>
      <Link to='/'><button className='px-6 py-2 my-4'>Back Home</button></Link>
    </div>
  )
}

export default Account