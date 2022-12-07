const express = require('express')
const cors = require('cors')
const httpContext = require('express-http-context')
const { v4: uuidv4 } = require('uuid')
const routes = require('./routes')
const migration = require('../infrastructure/migrations')
const Logger = require('../helpers/utils/logger')

class AppServer {

  constructor() {
    this.server = express()
    this.server.set('x-powered-by', false)
    this.server.set('etag', false)
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(express.json())
    this.server.use(cors())

    const logger = new Logger()

    // generate reqId each request
    this.server.use(httpContext.middleware)
    this.server.use((req, _res, next) => {
      const uuid = uuidv4()
      httpContext.set('reqId', uuid)
      logger.info('incoming request', {
        endpoint: req.url,
        query: req.query,
        params: req.params,
        body: req.body,
      })
      next()
    })

    // routing
    this.server.use('/', routes)

    // migration db
    migration.init()
  }
}

module.exports = AppServer