import { createContext, useContext, useEffect, useState } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth'
import {auth} from '../firebase'
import { useDispatch } from 'react-redux'
import { postUser } from '../redux/actions/actions'

const UserContext = createContext()

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})
  const dispatch = useDispatch()
  const createUser = async (email, password) => {
    const register = await createUserWithEmailAndPassword(auth, email, password)
    let userRegister = {
      email: register.user.email,
      idUser: register.user.uid 
    }
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      let actualUser = {
        email: currentUser.email,
        idUser: currentUser.uid
      }
      dispatch(postUser(actualUser))
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{createUser, user, logout, signIn, googleSignIn}}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}

export default AuthContextProvider