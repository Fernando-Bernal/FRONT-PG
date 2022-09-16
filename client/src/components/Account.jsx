import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { analytics } from '../firebase';
import {logEvent } from 'firebase/analytics';
import Swal from "sweetalert2";
import NavBar from './NavBar';
import { useEffect } from 'react';

const Account = () => {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(false)

  console.log(user.uid)

  const usersAdmin = ()=>{
    if(user?.email === 'luismfalco8@gmail.com' && user?.uid === 'eAuEIixgTwfhUcz7hFOTTbOQQxY2' || user?.email === 'luismfalco7@gmail.com' && user?.uid === 'S5aTKeI37ZMsJN5tm2g6KcobpgI2'){
      setAdmin(true)
    }else{
      setAdmin(false)
    }
  }

  useEffect(()=>{
    logEvent(analytics,'ACCOUNT |S.P|')
  },[])

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

      <div className="bg-opacity-50 py-40">
        <div className="container mx-auto max-w-2xl shadow-md md:w-3/4">
          <div className="rounded-t-lg border-t-2 border-[#00ff01] bg-gray-100 bg-opacity-5 p-4">
            <div className="mx-auto max-w-sm md:mx-0 md:w-full">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  alt="User avatar"
                  src="https://avatars3.githubusercontent.com/u/72724639?s=400&u=964a4803693899ad66a9229db55953a3dbaad5c6&v=4"
                />

                <h1 className="text-gray-600">{user?.displayName}</h1>
                
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
            <div className="w-full items-center space-y-4 p-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="mx-auto max-w-sm md:w-1/3">Account</h2>
              <div className="mx-auto max-w-sm md:w-2/3">
                <label className="text-sm text-gray-400">Email</label>
                <div className="inline-flex w-full border">
                  <div className="w-1/12 bg-gray-100 bg-opacity-50 pt-2">
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
                    className="w-11/12 p-2 focus:text-gray-600 focus:outline-none"
                    placeholder={user && user.email}
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr />
            <div className="w-full  items-center space-y-4  p-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="mx-auto max-w-sm md:w-1/3">Personal info</h2>
              <div className="mx-auto max-w-sm space-y-5 md:w-2/3">
                <div>
                  <label className="text-sm text-gray-400">Full name</label>
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
                  <label className="text-sm text-gray-400">Phone number</label>
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
            <div className="w-full items-center space-y-4 p-8 text-gray-500 md:inline-flex md:space-y-0">
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
                    className="ml-4 w-11/12 p-2 focus:text-gray-600 focus:outline-none"
                    placeholder="New"
                  />
                </div>
              </div>

              <div className="text-center md:w-3/12 md:pl-6">
                <button
                  className="mx-auto inline-flex w-full max-w-sm items-center rounded-md bg-indigo-400 py-2 px-4 text-center text-white focus:outline-none md:float-right"
                >
                  <svg fill="none" className="mr-2 w-4 text-white" viewBox="0 0 24 24" stroke="currentColor">
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
              <button className="mr-4 px-6 py-2 my-4 inline-flex items-center focus:outline-none">
                <svg fill="none" className="mr-2 w-4" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    

  )
}

export default Account