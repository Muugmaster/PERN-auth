import config from './config'
import { sign } from 'jsonwebtoken'
import { User } from '../entity/User'

const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, config.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15min',
  })
}

const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    config.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  )
}

export default { createAccessToken, createRefreshToken }
