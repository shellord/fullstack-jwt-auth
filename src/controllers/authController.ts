import { Request, Response, NextFunction } from 'express'
import { registerSchema } from '../schema/authSchema'
import createError from 'http-errors'

export const login = (req: Request, res: Response) => {
  res.send('login route')
}

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValid = await registerSchema.isValid(req.body, { abortEarly: true })
  if (!isValid) {
    next(createError(400))
  } else {
    res.json({
      message: 'User created successfully',
    })
  }
}
