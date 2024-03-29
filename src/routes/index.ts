import express from 'express'
import authRouter from './auth'
import protectedRouter from './protected'

import createError from 'http-errors'

const router = express.Router()

router.get('/', (_, res) => {
  res.send('Api is running')
})

router.use('/auth', authRouter)
router.use('/protected', protectedRouter)

router.use((_, res, next) => {
  next(createError(404))
})

export default router
