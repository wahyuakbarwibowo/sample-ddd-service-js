const Logger = require('../../helpers/utils/logger')
const User = require('../repositories/user.repo')

const logger = new Logger()
const migration1 = async () => {
  try {
    await User.sync()
  } catch (err) {
    logger.error('error on migration db', err)
  }
}

const init = async () => {
  await migration1()
}

module.exports = init