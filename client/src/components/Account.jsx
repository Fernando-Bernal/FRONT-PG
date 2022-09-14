import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Swal from "sweetalert2";
import NavBar from './NavBar';
import { useEffect } from 'react';

const Account = () => {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(false)

  const usersAdmin = ()=>{
    if(user?.email === 'luismfalco8@gmail.com' && user?.uid === 'eAuEIixgTwfhUcz7hFOTTbOQQxY2'){
      setAdmin(true)
    }
  }

  useEffect(()=>{
    usersAdmin()
  },[user])

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
    <div>
      <NavBar/>
      <div className="pt-[90px]">
        <div className="container mx-auto max-w-2xl md:w-3/4">
          <div className="rounded-t-lg border-2 border-[#00ff01] p-4">
            <div className="mx-auto max-w-sm md:mx-0 md:w-full">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  alt=""
                  src='https://lh3.googleusercontent.com/a/AItbvmnKUAywQiF7k0NGrb5Vt6QeGCKFXZSZg1hw4CjrVQ=s96-c'
                />
                <h1 className="text-white">{user?.displayName}</h1>
                <Link to={'/admin'}>
                  {admin && 
                    <button
                      className='px-6 py-2 my-4 focus:outline-none'>
                      Admin
                    </button>
                  }
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white">
            <div className="w-full items-center space-y-4 p-4 md:inline-flex md:space-y-0">
              <h2 className="mx-auto max-w-sm md:w-1/3">Account</h2>
              <div className="mx-auto max-w-sm md:w-2/3">
                <label className="text-sm">Email</label>
                <div className="inline-flex w-full border">
                  <div className="w-1/12 bg-gray-100 pt-2">
                    <svg
                      fill="none"
                      className="mx-auto w-6 text-gray-400"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="w-11/12 p-2"
                    placeholder={user && user.email}
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr />
            <div className="w-full items-center space-y-4 p-4 md:inline-flex md:space-y-0">
              <h2 className="mx-auto max-w-sm md:w-1/3">Personal info</h2>
              <div className="mx-auto max-w-sm space-y-5 md:w-2/3">
                <div>
                  <label className="text-sm">Full name</label>
                  <div className="inline-flex w-full border">
                    <div className="w-1/12 bg-gray-100 pt-2">
                      <svg
                        fill="none"
                        className="mx-auto w-6 text-gray-400"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-11/12 p-2 focus:text-gray-600 focus:outline-none"
                      placeholder={user?.displayName}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm">Phone number</label>
                  <div className="inline-flex w-full border">
                    <div className="w-1/12 bg-gray-100 pt-2">
                      <svg
                        fill="none"
                        className="mx-auto w-6 text-gray-400"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-11/12 p-2 focus:text-gray-600 focus:outline-none"
                      placeholder="12341234"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="w-full items-center space-y-4 p-8 md:inline-flex md:space-y-0">
              <h2 className="mx-auto max-w-sm md:w-4/12">Change password</h2>

              <div className="mx-auto w-full max-w-sm space-y-5 pl-2 md:inline-flex md:w-5/12 md:pl-9">
                <div className="inline-flex w-full border-b">
                  <div className="w-1/12 pt-2">
                    <svg
                      fill="none"
                      className="mx-auto w-6 text-gray-400"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="ml-4 w-11/12 p-2"
                    placeholder="New"
                  />
                </div>
              </div>

              <div className="text-center md:w-3/12 md:pl-6">
                <button
                  className="mx-auto inline-flex w-full max-w-sm items-center rounded-md bg-indigo-400 py-2 px-4 text-center text-white focus:outline-none md:float-right"
                >
                  <svg fill="none" className="mr-2 w-4 text-white" viewBox="0 0 24 24" stroke="currentColor"  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Update
                </button>
              </div>
            </div>

            <hr />
            <div className="w-full p-4 justify-end text-gray-500 items-center flex">
              <button onClick={handleLogout} className='px-6 py-2 my-4 mr-4 inline-flex items-center focus:outline-none'>Logout</button>
              <Link to='/'><button className='w-full py-4 my-2'>Back Home</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    

  )
}

export default Account