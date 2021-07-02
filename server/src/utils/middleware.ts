import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import config from '../utils/config'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization']

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    })
  }

  console.log(authorization)

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, config.ACCESS_TOKEN_SECRET!)
    // @ts-ignore
    req.payload = payload as any
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    })
  }
  return next()
}

export default { isAuth }
