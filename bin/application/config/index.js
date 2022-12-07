const package = require('../../../package.json')
const dotenv = require('dotenv')
const Confidence = require('confidence')

dotenv.config()
const config = {
  server: {
    name: package.name,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD
  },
  bearerAuth: {
    privateKey: process.env.BEARER_AUTH_PRIVATE_KEY
  },
  database: {
    postgres: {
      url: process.env.POSTGRES_URL
    }
  }
}

const store = new Confidence.Store(config)

module.exports = store