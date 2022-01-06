import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))

app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT)
})
