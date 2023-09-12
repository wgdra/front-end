import React, { useState, useEffect, createContext, useContext } from 'react'
import Login from '../Components/Auth/Login'
import { isAuthenticated } from '../services/AuthService'

const UserContext = createContext()

export const useAppContext = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [token, setToken] = useState('')

  useEffect(() => {
    const checkLoggedIn = async () => {
      let cuser = isAuthenticated()
      if (cuser) {
        setCurrentUser(cuser)
      }
    }
    checkLoggedIn()
  }, [])

  useEffect(() => {
    if (currentUser) {
      setToken(currentUser.token)
    }
  }, [currentUser])

  const contextValue = { currentUser, setCurrentUser, token }

  return (
    <UserContext.Provider value={contextValue}>
      {currentUser?.token ? children : <Login />}
    </UserContext.Provider>
  )
}

export default UserContext
