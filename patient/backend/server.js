import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cors from 'cors'
import patientRoutes from './routes/patientRoutes.js'
import patientTransactionRoutes from './routes/patientTransactionRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// app.use('/api/products', productRoutes)
app.use('/patient/api/patient', patientRoutes)
app.use('/patient/api/transaction', patientTransactionRoutes)
// app.use('/api/upload', uploadRoutes)

app.get('/patient/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/patient/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/patient/', (req, res) => {
    res.send('API Patient is running....')
  })
}
app.get('/patient/test', (req, res) => {
  res.send('API Patient is running....')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5004

app.listen(
  PORT,
  console.log(
    `Server Patient running in ${process.env.NODE_ENV} mode on port ${PORT} have secret=${process.env.JWT_SECRET}`.yellow.bold
  )
)
