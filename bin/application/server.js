const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const migration = require('../infrastructure/migrations')

class AppServer {

  constructor() {
    this.server = express()
    this.server.set('x-powered-by', false)
    this.server.set('etag', false)
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(express.json())
    this.server.use(cors())

    // routing
    this.server.use('/', routes)

    // migration db
    migration.init()
  }
}

module.exports = AppServer