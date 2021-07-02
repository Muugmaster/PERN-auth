import React, { useEffect, useState } from 'react'
import { Routes } from './Routes'
import usersService from './services/users'

function App() {
  const [user, setUser] = useState(null)

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

  // @ts-ignore
  return <Routes user={user} />
}

export default App
