import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import config from '../utils/config'
import { verify } from 'jsonwebtoken'
import { User } from '../entity/User'
import { sendRefreshToken } from '../utils/sendRefreshToken'
import auth from '../utils/auth'

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const foundUser = await User.findOne({ email })

  if (foundUser)
    return res
      .status(400)
      .json({ success: false, message: 'Email is already in use' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    await User.insert({
      email,
      password: passwordHash,
    })
    return res.status(201).json({ success: true, message: 'user created' })
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ success: false, message: 'Something went wrong!' })
  }
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid username or password' })
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid username or password' })
  }

  // Login successful
  sendRefreshToken(res, auth.createRefreshToken(user))

  const userForToken = {
    email: user.email,
    id: user.id,
  }

  return res.status(200).json({
    success: true,
    accessToken: auth.createAccessToken(user),
    user: userForToken,
  })
}

const logout = async (_: Request, res: Response) => {
  res.clearCookie('jid', {
    domain: 'localhost',
    path: '/api/v1/users/refresh_token',
    httpOnly: true,
  })
  return res.send({ success: true })
}

const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.jid
  if (!token) {
    return res.send({ success: false, accessToken: '' })
  }

  let payload: any = null
  try {
    payload = verify(token, config.REFRESH_TOKEN_SECRET!)
  } catch (err) {
    console.log(err)
    return res.send({ success: false, accessToken: '' })
  }

  // token is valid and we can send back access token
  const user = await User.findOne({ id: payload.userId })

  if (!user) {
    return res.send({ success: false, accessToken: '' })
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ success: false, accessToken: '' })
  }

  sendRefreshToken(res, auth.createRefreshToken(user))

  return res.send({ success: true, accessToken: auth.createAccessToken(user) })
}

const profile = async (req: Request, res: Response) => {
  const authorization = req.headers['authorization']

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    })
  }

  try {
    const token = authorization.split(' ')[1]
    const payload: any = verify(token, config.ACCESS_TOKEN_SECRET!)
    // @ts-ignore
    req.payload = payload
    const user = await User.findOne(payload.userId)
    return res.status(200).json({ user })
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    })
  }
}

const getAllUsers = async (_: Request, res: Response) => {
  const users = await User.find()
  return res.status(200).json({ success: true, users })
}

export default {
  register,
  login,
  logout,
  refreshToken,
  profile,
  getAllUsers,
}
