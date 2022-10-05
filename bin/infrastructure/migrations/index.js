const userAuthMigration = require('./user')

const init = () => {
  userAuthMigration()
}

module.exports = {
  init
}