import { Response } from 'express'

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/api/v1/users/refresh_token',
  })
}
