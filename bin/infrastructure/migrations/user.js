const Logger = require('../../helpers/utils/logger')
const User = require('../repositories/user')

const logger = new Logger()
const migration1 = async () => {
  try {
    await User.sync()
  } catch (err) {
    logger.error('userAuth::migration1', 'error on migration db', 'migration1::catch', err)
  }
}

const init = async () => {
  await migration1()
}

module.exports = init