import { Request, Response, NextFunction } from 'express'

export const allPosts = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const { user } = req
  res.json({ user: user, posts: 'All posts' })
}
