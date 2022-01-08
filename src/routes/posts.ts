import express from 'express'
import { allPosts } from '../controllers/postsController'
import { authenticateToken } from '../middlewares/authenticateToken'

const router = express.Router()

router.post('/all', authenticateToken, allPosts)

export default router
