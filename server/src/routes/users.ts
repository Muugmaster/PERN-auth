import { Router } from 'express'
import users from '../controllers/users'
import middleware from '../utils/middleware'

const usersRouter = Router()

// Register
usersRouter.post('/register', users.register)

// Login
usersRouter.post('/login', users.login)

// Logout
usersRouter.get('/logout', users.logout)

// Refresh token
usersRouter.post('/refresh_token', users.refreshToken)

// Profile
usersRouter.get('/profile', users.profile)

// Get all users
usersRouter.get('/all', middleware.isAuth, users.getAllUsers)

export default usersRouter
