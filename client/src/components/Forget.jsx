import React, {useState} from 'react'
import {sendPasswordResetEmail} from 'firebase/auth'
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';

const Forget = () => {

  const [email, setEmail] = useState()
  const navigate = useNavigate()

  const handleChanges = (e) => {
    setEmail( e.target.value );
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await sendPasswordResetEmail(auth, email)
      Swal.fire({
      icon: 'success',
      title: 'Email send',
      showConfirmButton: false,
      timer: 2000
      })
    navigate('/account')
    } catch (error) {
      if (error.code === 'auth/user-not-found'){
        Swal.fire({
        icon: 'error',
        title: 'User not found',
        showConfirmButton: false,
        timer: 2000
        })}
    }
}
  return (
    <div className="text-white bg-black h-screen text-center">
      <div className='max-w-[700px] mx-auto p-4'>
        <div>
          <h1 className='text-2xl font-bold py-2'>Recover your password</h1>
        </div>
        <form>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address:</label>
            <input name='email' onChange={handleChanges} className='p-3 rounded-md text-black' type="email" />
            <button onClick={handleSubmit} className='w-full py-4 my-2'>Send Email</button>
          </div>
        </form>
        <Link to='/'><button className='w-full py-4 my-2'>Back Home</button></Link>
      </div>
    </div>
  )
}

export default Forget