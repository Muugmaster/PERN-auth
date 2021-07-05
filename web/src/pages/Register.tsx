import React, { useState } from 'react'
import { useContext } from 'react'
import { FormEvent } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('form submitted')
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

      <button type="submit">register</button>
    </form>
  )
}
