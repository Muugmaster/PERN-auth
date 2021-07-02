import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import usersService from '../services/users'
import loginService from '../services/login'

interface Props {}

export const Home: React.FC<Props> = () => {
  let history = useHistory()

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const response = await usersService.getAll()
    console.log(response)
    setUsers(response.users)
  }

  const handleLogout = async () => {
    const response = await loginService.logOut()
    window.localStorage.removeItem('user')
    console.log(response)
    history.push('/register')
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <h3>Home page</h3>
      <div>
        <h2>Users</h2>
        {users.length !== 0
          ? users.map((user: any) => {
              return <div key={user.id}>{user.email}</div>
            })
          : null}
      </div>
      <button onClick={() => handleLogout()}>logout</button>
    </div>
  )
}
