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
const corsOpts = {
  origin: '*',
  credentials: true,
  methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/dept1/api/products', productRoutes)
app.use('/dept1/api/orders', orderRoutes)
app.use('/dept1/api/upload', uploadRoutes)

app.get('/dept1/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/dept1/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/dept1/', (req, res) => {
    res.send(`Medical store products running in ${process.env.NODE_ENV} 
    mode on port ${PORT} have secret=${process.env.JWT_SECRET}
    and db=${process.env.MONGO_URI}`)
    })
}
app.get('/dept1/test', (req, res) => {
  res.send(`Medical store products running in ${process.env.NODE_ENV} 
  mode on port ${PORT} have secret=${process.env.JWT_SECRET}
  and db=${process.env.MONGO_URI}`)
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5002

app.listen(
  PORT,
  console.log(
    `Medical store products running in ${process.env.NODE_ENV} mode on port ${PORT} have secret=${process.env.JWT_SECRET}`.yellow.bold
  )
)
