import { config } from 'dotenv'

config()

// Token secrets
let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
let REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

// Database
let DATABASE_URL = process.env.DATABASE_URL

// Server
let PORT = process.env.PORT

export default { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, DATABASE_URL, PORT }
