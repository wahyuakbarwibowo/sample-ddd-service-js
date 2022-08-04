const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../../../helper/error')
const Wrapper = require('../../../helper/utils/wrapper')

const config = require('../../../config')
const { privateKey } = config.bearerAuth
const expiresIn = '1h'
const wrapper = new Wrapper()

class BearerAuth {
  constructor() { }

  isAuthenticated(req, res, next) {
    const auth = req.headers.authorization
    if (!auth) {
      return wrapper.responseError(res, new UnauthorizedError('bearer auth is required'))
    }
    const [, token] = auth.split(' ')
    try {
      const decoded = jwt.verify(token, privateKey)
      req.user = decoded
      next()
    } catch (err) {
      return wrapper.responseError(res, new UnauthorizedError('bearer auth is error'))
    }
  }

  generateToken(payload, options = { expiresIn }) {
    return jwt.sign(payload, privateKey, options)
  }

}

module.exports = BearerAuth;