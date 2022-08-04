const { database } = require('../../config')
const Wrapper = require('../../helper/utils/wrapper')
const Postgres = require('../../helper/database/postgres')

const { postgres } = database
const db = new Postgres({ connectionString: postgres.url })
const wrapper = new Wrapper()

class UserAuth {

  async getUser(username, password) {
    const statement = 'SELECT * FROM users WHERE username = $1 AND password = $2'
    const data = [username, password]
    try {
      const result = await db.query(statement, data)
      if (result.err) throw result.err
      return wrapper.data(result.data)
    } catch (err) {
      return wrapper.error(err.message)
    }
  }

  async getByUsername(username) {
    const statement = 'SELECT * FROM users WHERE username = $1'
    const data = [username]
    try {
      const result = await db.query(statement, data)
      if (result.err) throw result.err
      return wrapper.data(result.data)
    } catch (err) {
      return wrapper.error(err.message)
    }
  }

  async getByEmail(email) {
    const statement = 'SELECT * FROM users WHERE email = $1'
    const data = [email]
    try {
      const result = await db.query(statement, data)
      if (result.err) throw result.err
      return wrapper.data(result.data)
    } catch (err) {
      return wrapper.error(err.message)
    }
  }

  async getByUuid(uuid) {
    const statement = 'SELECT * FROM users WHERE uuid = $1'
    const data = [uuid]
    try {
      const result = await db.query(statement, data)
      if (result.err) throw result.err
      return wrapper.data(result.data)
    } catch (err) {
      return wrapper.error(err.message)
    }
  }

  async insertUser(uuid, name, username, email, password) {
    const statement = 'INSERT INTO users(uuid, name, username, email, password) VALUES($1, $2, $3, $4, $5)'
    const data = [uuid, name, username, email, password]
    try {
      const result = await db.query(statement, data)
      if (result.err) throw result.err
      return wrapper.data(result.data)
    } catch (err) {
      return wrapper.error(err.message)
    }
  }
}

module.exports = UserAuth