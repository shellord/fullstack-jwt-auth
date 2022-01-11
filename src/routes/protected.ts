import express from 'express'
import { data } from '../controllers/postsController'
import { authenticateToken } from '../middlewares/authenticateToken'

const router = express.Router()

router.post('/data', authenticateToken, data)

export default router
