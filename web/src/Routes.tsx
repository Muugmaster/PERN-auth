import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

export const Routes: React.FC = ({ user }: any) => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            // @ts-ignore
            render={() => (user ? <Redirect to="/" /> : <Login />)}
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
