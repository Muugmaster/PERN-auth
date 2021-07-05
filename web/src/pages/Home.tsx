import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <h3>Home page</h3>
      <div>
        <h2>Hello and welcome!</h2>
      </div>
    </div>
  )
}
