import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { analytics } from '../firebase';
import {logEvent } from 'firebase/analytics';
import Swal from "sweetalert2";
import NavBar from './NavBar';
import { useEffect } from 'react';
import {MdEmail, MdPerson, MdPhoneIphone, MdLock, MdChangeCircle, MdImage} from 'react-icons/md'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import { updateProfile } from 'firebase/auth'

const Account = () => {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(false)
  const [imageUp, setImageUp] = useState(null)
  const [photoURL, setPhotoURL] = useState('https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231709/thesomeday123170900021.jpg')

  const usersAdmin = () => {
    if(user?.email === 'marioelkamui@gmail.com' && user?.uid === 'mXfXQunp6gNgqnLrqpnPwHYcKEQ2'){
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
    if(user?.photoURL){
      setPhotoURL(user.photoURL)
    }
  },[user])

  const handleChange = (e) => {
    if (e.target.files[0]){
      setImageUp(e.target.files[0])
    }
  }

  const uploadImage = async () => {
    if (imageUp == null) return
    const imageRef = ref(storage, `${user.uid}`)
    await uploadBytes(imageRef, imageUp)
    const imageURL = await getDownloadURL(imageRef)
    updateProfile(user, {photoURL: imageURL})
    Swal.fire({
      icon: 'success',
      title: 'Image Upload',
      showConfirmButton: false,
      timer: 2000
    })
  }

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
                  className="h-[80px] w-[80px] rounded-full"
                  alt=""
                  src={photoURL}
                />
                <h1 className="text-white text-xl">{user?.displayName}</h1>
                <Link to={'/admin'}>
                  {admin && 
                    <button
                      className='px-6 py-2 my-4'>
                      Admin
                    </button>
                  }
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-3 bg-white">
            <div className="w-full items-center p-4 md:inline-flex">
              <h2 className="mx-auto max-w-sm md:w-1/3">Account</h2>
              <div className="mx-auto max-w-sm md:w-2/3">
                <label className="text-sm">Email</label>
                <div className="inline-flex w-full border">
                  <div className="w-1/12 bg-gray-100 pt-2">
                    <MdEmail className='h-6 w-6 ml-1'/>
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
                  <label className="text-sm">Display name</label>
                  <div className="inline-flex w-full border">
                    <div className="w-1/12 bg-gray-100 pt-2">
                      <MdPerson className='h-6 w-6 ml-1'/>
                    </div>
                    <input
                      type="text"
                      className="w-11/12 p-2 focus:text-gray-600 focus:outline-none"
                      placeholder={user?.displayName}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm">Phone number</label>
                  <div className="inline-flex w-full border">
                    <div className="w-1/12 bg-gray-100 pt-2">
                      <MdPhoneIphone className='h-6 w-6 ml-1'/>
                    </div>
                    <input
                      type="text"
                      className="w-11/12 p-2"
                      placeholder="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full items-center p-4 md:inline-flex">
              <h2 className="mx-auto max-w-sm md:w-1/3">Change password</h2>
              <div className="mx-auto max-w-sm md:w-2/3">
                <label className="text-sm">New Password</label>
                <div className="inline-flex w-full border">
                  <div className="w-1/12 bg-gray-100 pt-2">
                    <MdLock className='h-6 w-6 ml-1'/>
                  </div>
                  <input
                    type="email"
                    className="w-11/12 p-2"
                    placeholder='...'
                  />
                </div>
              </div>
            </div>
            <div className="w-full items-center p-4 md:inline-flex">
              <h2 className="mx-auto max-w-sm md:w-1/3">Upload an image</h2>
              <div className="mx-auto max-w-sm md:w-2/3">
                <label className="text-sm">New profile image</label>
                <div className="inline-flex w-full border">
                  <div className="w-1/12 bg-gray-100 pt-2">
                    <MdImage className='h-6 w-6 ml-1'/>
                  </div>
                  <input
                    type="file"
                    className="w-11/12 p-2 bg-black"
                    onChange={handleChange}
                  />
                  <button onClick={uploadImage}>Upload</button>
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full items-center p-4 md:inline-flex">
              <h2 className="px-4">My Orders</h2>
            </div>
            <hr />
            <div className="w-full p-4 justify-center items-center flex">
              <button className='h-[60px] w-[160px] flex px-3 py-4 mx-6'><MdChangeCircle className='h-6 w-6 mr-1'/>Update Info</button>
              <button onClick={handleLogout} className='h-[60px] w-[160px] flex pl-[50px] py-4 mx-6'>Logout</button>
              <Link to='/'><button className='h-[60px] w-[160px] flex pl-[35px] py-4 mx-6'>Back Home</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account