import React from 'react'
import { useContext } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { UserContext } from './UserContext'
import loginService from './services/login'
import { Users } from './pages/Users'

const Logout: React.FC = () => {
  let history = useHistory()
  const { setUser } = useContext(UserContext)

  const handleLogout = async () => {
    const response = await loginService.logOut()
    window.localStorage.removeItem('user')
    console.log(response)
    setUser(null)
    history.push('/login')
  }

  return <button onClick={() => handleLogout()}>logout</button>
}

export const Routes: React.FC = () => {
  const { user } = useContext(UserContext)
  console.log(user)

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <Logout />
              </>
            )}
          </ul>
        </nav>
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Users} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
