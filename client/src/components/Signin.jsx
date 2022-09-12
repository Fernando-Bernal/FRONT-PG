import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Swal from "sweetalert2";

const Signin = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const {signIn} = UserAuth()

  const handleChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
    await signIn(user.email, user.password)
    Swal.fire({
      icon: 'success',
      title: 'You Login, Welcome!',
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
      if (error.code === 'auth/wrong-password'){
        Swal.fire({
        icon: 'error',
        title: 'Wrong Password',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/internal-error'){
        Swal.fire({
        icon: 'error',
        title: 'Fill the password',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/invalid-email'){
        Swal.fire({
        icon: 'error',
        title: 'Use a valid email',
        showConfirmButton: false,
        timer: 2000
        })}
      }
  }

  return (
    <div className="text-white bg-black h-screen">
      <div className='max-w-[700px] mx-auto p-4'>
        <div>
          <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
          <p className='py-2'>Don't have an account yet? <Link to='/createaccount' className='underline hover:text-[#00ff01]'>Create account.</Link></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address:</label>
            <input name='email' onChange={handleChanges} className='p-3 rounded-md text-black' type="email" />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Password:</label>
            <input name='password' onChange={handleChanges} className='p-3 rounded-md text-black' type="password" />
          </div>
          <button className='w-full py-4 my-2'>Sign In</button>
          <Link to='/'><button className='w-full py-4 my-2'>Back Home</button></Link>
        </form>
      </div>
    </div>
  )
}

export default Signin