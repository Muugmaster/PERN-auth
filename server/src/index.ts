import http from 'http'
import app from './app'
import { createConnection } from 'typeorm'
import config from './utils/config'

import 'reflect-metadata'

const server = http.createServer(app)
createConnection()
  .then(() =>
    server.listen(config.PORT, () => {
      console.log(`Server running on port: ${config.PORT}`)
    })
  )
  .catch((err) => console.log(err))
