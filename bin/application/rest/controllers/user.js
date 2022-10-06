const Wrapper = require('../../../helpers/utils/wrapper')
const UserDomain = require('../../../domain/user')
const { InternalServerError } = require('../../../helpers/error')
const BearerAuth = require('../authorization/bearer_auth')

const wrapper = new Wrapper()
const userD = new UserDomain()
const bearerAuth = new BearerAuth()

class User {

  async login(req, res) {
    try {
      const payload = { ...req.body }
      const getUser = await userD.login(payload)
      if (getUser instanceof Error) return wrapper.responseError(res, getUser)
      const tokenPayload = {
        username: getUser.username,
        name: getUser.name,
        email: getUser.email,
        uuid: getUser.uuid
      }
      const data = {
        token: bearerAuth.generateToken(tokenPayload, { expiresIn: '1h' }),
      }
      return wrapper.response(res, 200, {
        success: true,
        code: 200,
        message: 'login success',
        data
      })
    } catch (error) {
      return wrapper.responseError(res, new InternalServerError('an occured error'))
    }
  }

  async register(req, res) {
    try {
      const payload = { ...req.body }
      const createUser = await userD.register(payload)
      if (createUser instanceof Error) return wrapper.responseError(res, createUser)
      return wrapper.response(res, 200, {
        success: true,
        code: 201,
        message: 'register success',
        data: {
          uuid: createUser.uuid,
          name: createUser.name,
          username: createUser.username,
          email: createUser.email
        }
      })
    } catch (error) {
      return wrapper.responseError(res, new InternalServerError('an occured error'))
    }

  }

  async getUser(req, res) {
    const getUser = await userD.getUser(req.user)
    if (getUser instanceof Error) return wrapper.responseError(res, getUser)
    const data = {
      username: getUser.username,
      name: getUser.name,
      email: getUser.email,
      uuid: getUser.uuid
    }
    return wrapper.response(res, 200, {
      success: true,
      code: 200,
      message: 'get user success',
      data,
    })
  }

}

module.exports = User