const { v4: uuidv4 } = require('uuid')
const Wrapper = require('../../../helper/utils/wrapper')
const UserAuthDomain = require('../../../domain/user_auth')
const UserAuthModel = require('../../../infrastructure/repositories/user_auth')
const { UnauthorizedError } = require('../../../helper/error')
const BearerAuth = require('../../../application/rest/authorization/bearer_auth')

const wrapper = new Wrapper()
const userAuthM = new UserAuthModel()
const userAuthD = new UserAuthDomain(userAuthM)
const bearerAuth = new BearerAuth()

class UserAuth {

  async login(req, res) {
    const payload = { ...req.body }
    const getUser = await userAuthD.login(payload)
    if (getUser instanceof Error) return wrapper.responseError(res, getUser)
    if (getUser.data.length === 0) {
      return wrapper.responseError(res, new UnauthorizedError('username or password is incorrect'))
    }
    delete getUser.data[0].password
    const data = {
      token: bearerAuth.generateToken(getUser.data[0], { expiresIn: '1h' }),
    }
    return wrapper.response(res, 200, {
      message: 'login success',
      code: 200,
      data,
      success: true
    })
  }

  async register(req, res) {
    const payload = { ...req.body }
    payload.uuid = uuidv4()
    const insertUser = await userAuthD.register(payload)
    if (insertUser instanceof Error) return wrapper.responseError(res, insertUser)
    return wrapper.response(res, 200, {
      message: 'register success',
      code: 201,
      data: {
        uuid: payload.uuid,
        name: payload.name,
        username: payload.username,
        email: payload.email
      },
      success: true
    })
  }

  async getUser(req, res) {
    const getUser = await userAuthD.getUser(req.user)
    if (getUser instanceof Error) return wrapper.responseError(res, getUser)
    const userData = {
      uuid: getUser.data[0].uuid,
      name: getUser.data[0].name,
      username: getUser.data[0].username,
      email: getUser.data[0].email
    }
    return wrapper.response(res, 200, {
      message: 'get user success',
      code: 200,
      data: userData,
      success: true
    })
  }

}

module.exports = UserAuth