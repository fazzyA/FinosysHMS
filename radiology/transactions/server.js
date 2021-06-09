import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cors from 'cors'
import patientTransactionRoutes from './routes/patientTransactionRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/transaction', patientTransactionRoutes)


const __dirname = path.resolve()

app.get('/', (req, res) => {
  res.send('API radiology service is running....')
})
app.get('/test', (req, res) => {
  res.send('API radiology service is running....')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5005

app.listen(
  PORT,
  console.log(
    `Dept radiology service running in ${process.env.NODE_ENV} mode on port ${PORT} have secret=${process.env.JWT_SECRET}`.yellow.bold
  )
)
