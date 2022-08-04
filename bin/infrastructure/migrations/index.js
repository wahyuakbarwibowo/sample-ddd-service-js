const userAuthMigration = require('./user_auth')

const init = () => {
  userAuthMigration()
}

module.exports = {
  init
}