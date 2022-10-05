const { UnauthorizedError } = require('../../../helpers/error')
const config = require('../../config')
const Wrapper = require('../../../helpers/utils/wrapper')
const wrapper = new Wrapper()

const { username, password } = config.get('/basicAuth')

class BasicAuth {

  isAuthenticated(req, res, next) {
    const auth = req.headers.authorization
    if (!auth) {
      return wrapper.responseError(res, new UnauthorizedError('basic auth is required'))
    }
    const [, base64] = auth.split(' ')
    const [usernameReq, passwordReq] = Buffer.from(base64, 'base64').toString().split(':')
    if (usernameReq !== username || passwordReq !== password) {
      return wrapper.responseError(res, new UnauthorizedError('basic auth is error'))
    }
    next()
  }
}

module.exports = BasicAuth