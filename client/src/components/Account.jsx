import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { analytics } from '../firebase';
import {logEvent } from 'firebase/analytics';
import Swal from "sweetalert2";
import NavBar from './NavBar';
import { useEffect } from 'react';
import {MdEmail, MdPerson, MdLock, MdImage, MdFavorite} from 'react-icons/md'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import { updatePassword, updateProfile } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail, getUsers } from '../redux/actions/actions';

const Account = () => {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(false)
  const [imageUp, setImageUp] = useState(null)
  const [photoURL, setPhotoURL] = useState('https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231709/thesomeday123170900021.jpg')
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const orders = useSelector(state => state.orders)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const usersAdmin = () => {
    if(user?.email === 'marioelkamui@gmail.com' && user?.uid === 'mXfXQunp6gNgqnLrqpnPwHYcKEQ2' ||
       user?.email === 'luismfalco8@gmail.com' && user?.uid === 'eAuEIixgTwfhUcz7hFOTTbOQQxY2' ){
      setAdmin(true)
    }else{
      setAdmin(false)
    }
  }

  const validateAccount = (users) => {
    let userVal = users.find(u => u.email === user.email)
    if(userVal.status === "Disabled" || userVal.status === "Eliminated"){
      navigate('/')
      Swal.fire({
        icon: 'warning',
        title: 'Your account is Disabled or Eliminated',
        showConfirmButton: false,
        timer: 2000
      })
      logout()
    }
  }

  useEffect(()=>{
    logEvent(analytics,'ACCOUNT |S.P|')
    dispatch(getOrderDetail(user.email))
    dispatch(getUsers())
    return () => {
      setImageUp(null)
    }
  },[])

  useEffect(()=>{
    usersAdmin()
    if(users.length > 0 && user) validateAccount(users)
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
    if (imageUp === null) return
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
    window.location.reload()
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      Swal.fire({
        icon: 'success',
        title: 'See you later!',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  const handlePassword = async (e) => {
    setPassword( e.target.value )
  }

  const changePassword = async () => {
    try {
      updatePassword(user, password)
      Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        showConfirmButton: false,
        timer: 2000
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleName = async (e) => {
    setName( e.target.value )
  }

  const changeName = async () => {
    try {
      updateProfile(user, {displayName: name})
      Swal.fire({
        icon: 'success',
        title: 'Name Updated',
        showConfirmButton: false,
        timer: 2000
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
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
                <h1 className="text-white text-2xl">{user?.displayName}</h1>
                <Link to='/favorites'><button className="mr-4 px-8 py-4 text-xl"><MdFavorite/></button></Link>
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
                      onChange={handleName}
                    />
                  </div>
                  <button onClick={changeName}>Update Display name</button>
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
                    type="password"
                    className="w-11/12 p-2"
                    placeholder='...'
                    onChange={handlePassword}
                  />
                </div>
                <button onClick={changePassword}>Update Password</button>
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
                </div>
                <button onClick={uploadImage}>Upload new image</button>
              </div>
            </div>
            <hr />
            <div className="w-full items-center p-4 md:inline-flex">
              <h2 className="px-4">My Orders</h2>
              {orders ? orders.map(e => <p>{e}</p>): <p>No orders</p>}
            </div>
            <hr />
            <div className="w-full p-4 justify-center items-center flex">
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