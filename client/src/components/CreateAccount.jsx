import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Swal from "sweetalert2"

const Signup = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const {createUser} = UserAuth()
  const navigate = useNavigate()

  const handleChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if(user !== undefined){
    await createUser(user?.email, user?.password)
    Swal.fire({
      icon: 'success',
      title: 'Welcome to Sneaker Paradise!',
      showConfirmButton: false,
      timer: 2000
    })
    navigate('/account')
    window.location.reload()
  }
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/email-already-in-use'){
        Swal.fire({
        icon: 'error',
        title: 'Email already in use',
        showConfirmButton: false,
        timer: 2000
        })}
      if (error.code === 'auth/weak-password'){
        Swal.fire({
        icon: 'error',
        title: 'The Password should be at least 6 characters',
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
          <h1 className='text-2xl font-bold py-2'>Create an account</h1>
          <p className='py-2'>Already have an account? <Link to='/signin' className='underline hover:text-[#00ff01]'>Sign in.</Link></p>
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
          <button className='w-full py-4 my-2'>Create account</button>
          <Link to='/'><button className='w-full py-4 my-2'>Back Home</button></Link>
        </form>
      </div>
    </div>
  )
}

export default Signup