const packageJson = require('../../package.json')
const dotenv = require('dotenv')

dotenv.config()
const config = {
  server: {
    name: packageJson.name,
    port: process.env.PORT || 3000,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME || 'basicAuthUsername',
    password: process.env.BASIC_AUTH_PASSWORD || 'basicAuthPassword'
  },
  bearerAuth: {
    privateKey: process.env.BEARER_AUTH_PRIVATE_KEY || 'bearerAuthPrivateKey',
  },
  database: {
    postgres: {
      url: process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
    }
  }
}

module.exports = config