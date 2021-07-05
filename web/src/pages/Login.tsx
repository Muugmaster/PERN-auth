import React, { useState } from 'react'
import { useContext } from 'react'
import { FormEvent } from 'react'
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom'
import loginService from '../services/login'
import { UserContext } from '../UserContext'
import { setAccessToken } from '../utils/accessToken'

export const Login: React.FC<RouteComponentProps> = () => {
  const { user, setUser } = useContext(UserContext)
  let history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('form submitted')
    const user = await loginService.logIn({
      email,
      password,
    })
    if (user && user.success) {
      setAccessToken(user.accessToken)
      setUser(user.user)
      history.push('/users')
    }
  }

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
