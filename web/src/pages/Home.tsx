import React, { useEffect, useState } from 'react'
import usersService from '../services/users'

interface Props {}

export const Home: React.FC<Props> = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const response = await usersService.getAll()
    console.log(response)
    setUsers(response.users)
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
    </div>
  )
}
