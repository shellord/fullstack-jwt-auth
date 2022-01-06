import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import errorHandler from './middlewares/errorHandler'
import router from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('dev'))
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT)
})
