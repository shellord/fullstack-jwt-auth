import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { AnyZodObject, ZodError } from 'zod'

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (e: any) {
      next(createError(400, 'Invalid request body'))
    }
  }

export default validateResource
