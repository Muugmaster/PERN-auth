import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import usersService from '../services/users'
import { UserContext } from '../UserContext'

export const Users: React.FC = () => {
  const { user } = useContext(UserContext)
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const response = await usersService.getAll()
    console.log(response)
    setUsers(response.users)
  }

  useEffect(() => {
    if (user) {
      getUsers()
    }
  }, [])

  if (!user) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h3>Users page</h3>
      <div>
        <h2>Users</h2>
        {users.length !== 0
          ? users.map((user: any) => {
              return <div key={user.id}>{user.email}</div>
            })
          : null}
      </div>
    </div>
  )
}
