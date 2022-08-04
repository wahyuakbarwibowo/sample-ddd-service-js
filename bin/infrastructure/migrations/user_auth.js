const config = require('../../config')
const Postgres = require('../../helper/database/postgres')
const Logger = require('../../helper/utils/logger')

const logger = new Logger()
let db = null

const createConnectDb = async () => {
  db = new Postgres({ connectionString: config.database.postgres.url })
}

const migration1 = async () => {
  try {
    if (db) {
      const result = await db.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        uuid UUID NOT NULL UNIQUE,
        name VARCHAR(255),
        username VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP)`)
      if (result.err) throw result.err
    }
  } catch (err) {
    logger.error('userAuth::migration1', 'error on migration db', 'migration1::catch', err)
  }
}

const init = async () => {
  await createConnectDb()
  await migration1()
}

module.exports = init