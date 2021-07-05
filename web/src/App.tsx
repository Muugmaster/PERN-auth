import React, { useEffect, useState, useMemo } from 'react'
import { Routes } from './Routes'
import usersService from './services/users'
import { UserContext } from './UserContext'

function App() {
  const [user, setUser] = useState(null)

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  const checkLoginStatus = async () => {
    try {
      const response = await usersService.profile()
      console.log('logged in?', response)
      if (response) {
        setUser(response.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  return (
    <UserContext.Provider value={providerValue}>
      <Routes />
    </UserContext.Provider>
  )
}

export default App
