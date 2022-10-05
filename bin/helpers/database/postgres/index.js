const { Sequelize } = require('sequelize')
const config = require('../../../application/config')

const sequelize = new Sequelize(config.get('/database/postgres/url'), {
  logging: config.get('/server/env') === 'production' ? false : console.log
})

module.exports = sequelize