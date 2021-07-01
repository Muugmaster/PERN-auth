import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// Routes
import userRouter from './routes/users'

app.use(helmet())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/v1/users', userRouter)

app.get('/ping', (_, res) => {
  res.send('pong')
})

export default app
