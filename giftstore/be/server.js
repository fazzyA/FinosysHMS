import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/gs/api/products', productRoutes)
app.use('/gs/api/orders', orderRoutes)
app.use('/gs/api/upload', uploadRoutes)

app.get('/gs/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/gs/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/gs/', (req, res) => {
    res.send('Giftstore is running....')
  })
}
app.get('/gs/test', (req, res) => {
  res.send('Giftstore vproducts are running....')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5006

app.listen(
  PORT,
  console.log(
    `Giftstore BE running in ${process.env.NODE_ENV} mode on port ${PORT} have secret=${process.env.JWT_SECRET}`.yellow.bold
  )
)
