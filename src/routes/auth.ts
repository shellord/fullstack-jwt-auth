import express from 'express'
import {
  login,
  signup,
  refreshToken,
  logout,
} from '../controllers/authController'
import validateResource from '../middlewares/validateResource'
import { registerSchema, loginSchema } from '../schema/userSchema'

const router = express.Router()

router.post('/signup', validateResource(registerSchema), signup)
router.post('/login', validateResource(loginSchema), login)
router.post('/logout', logout)
router.post('/refreshToken', refreshToken)

export default router
