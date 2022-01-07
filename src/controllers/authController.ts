import { Request, Response, NextFunction } from 'express'
import {
  createUser,
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
  loginUser,
} from '../services/user'
import CreateError from 'http-errors'
import { TokenPayloadInput } from '../schema/userSchema'

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body)
    const { id, username, email } = user
    const accessToken = generateAccessToken({ id, username, email })
    const refreshToken = generateRefreshToken({ id, username, email })
    res.json({
      message: 'User created successfully',
      accessToken,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await loginUser(req.body)
    const { id, username, email } = user
    const accessToken = generateAccessToken({ id, username, email })
    const refreshToken = generateRefreshToken({ id, username, email })
    res.json({
      message: 'User logged in successfully',
      accessToken,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) throw CreateError(400, 'Refresh token is required')
    const payload = verifyRefreshToken(refreshToken)
    const { id, username, email } = payload as TokenPayloadInput
    const accessToken = generateAccessToken({ id, username, email })

    res.json({
      message: 'Refresh token successful',
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}
