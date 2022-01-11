import { Request, Response, NextFunction } from 'express'

export const data = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const { user } = req
  res.json({ user: user })
}
