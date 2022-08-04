const postgres = require('pg')
const sinon = require('sinon')
const assert = require('assert')

const pgConnection = require('../../../../../bin/helper/database/postgres/connection')

describe('bin/helper/database/postgres/connetion.js', () => {
  const config = {
    connectionString: 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
  }

  beforeEach(() => {
    sinon.stub(postgres, 'Pool')
  })

  afterEach(() => {
    postgres.Pool.restore()
  })

  describe('.createConnection', () => {
    it('should create connection', () => {
      const res = pgConnection.createConnection(config)
      assert.notEqual(res, null)
    })
    it('should cover branch condition create conncetion', () => {
      const res = pgConnection.createConnection(config)
      assert.notEqual(res, null)
    })
  })

  describe('.getConnection', () => {
    it('should get connection', () => {
      const res = pgConnection.getConnection(config)
      assert.notEqual(res, null)
    })
  })
})