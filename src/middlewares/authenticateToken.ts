import { Request, Response, NextFunction } from 'express'
import CreateError from 'http-errors'
import jwt from 'jsonwebtoken'

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw CreateError(401, 'No authorization header')
  }
  const token = authHeader.split(' ')[1]
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
    ///@ts-ignore
    req.user = user
  } catch (error) {
    throw CreateError(401, 'Invalid token or token expired')
  }
  next()
}
