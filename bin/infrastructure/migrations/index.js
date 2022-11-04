const userAuthMigration = require('./user.migration')

const init = () => {
  userAuthMigration()
}

module.exports = {
  init
}