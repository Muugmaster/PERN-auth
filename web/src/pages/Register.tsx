import React, { useState } from 'react'
import { FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('form submitted')
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
