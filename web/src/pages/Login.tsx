import React, { useState } from 'react'
import { FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import loginService from '../services/login'
import { setAccessToken } from '../utils/accessToken'

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
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
    }
    history.push('/')
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
