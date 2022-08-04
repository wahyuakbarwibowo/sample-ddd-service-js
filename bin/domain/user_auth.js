const { InternalServerError, UnprocessableEntityError, UnauthorizedError, NotFoundError } = require('../helper/error')
const Password = require('../helper/utils/password')
const UserAuthModel = require('../infrastructure/repositories/user_auth')

const passwordUtils = new Password()
const userAuthM = new UserAuthModel()

class UserAuth {

  async login(payload) {
    const { username, password } = payload

    const getUser = await userAuthM.getByUsername(username)
    if (getUser.err) {
      return new InternalServerError('fail to get user')
    }
    if (getUser.data.length === 0) {
      return new UnauthorizedError('username or password is incorrect')
    }

    const isMatch = await passwordUtils.compare(password, getUser.data[0].password)
    if (!isMatch) {
      return new UnauthorizedError('username or password is incorrect')
    }
    return getUser
  }

  async register(payload) {
    const { uuid, name, username, email, password } = payload

    // check username exist
    const getUser = await userAuthM.getByUsername(username)
    if (getUser.err) {
      return new InternalServerError('fail to get user')
    }
    if (getUser.data.length > 0) {
      return new UnprocessableEntityError('username already exists', [{
        field: 'username',
        message: 'username already exists'
      }])
    }

    // check email exist
    const getEmail = await userAuthM.getByEmail(email)
    if (getEmail.err) {
      return new InternalServerError('fail to get user')
    }
    if (getEmail.data.length > 0) {
      return new UnprocessableEntityError('email already exists', [{
        field: 'email',
        message: 'email already exists'
      }])
    }

    const hashPassword = await passwordUtils.hash(password)

    const insertUser = await userAuthM.insertUser(uuid, name, username, email, hashPassword)

    if (insertUser.err) {
      return new InternalServerError('fail to insert user')
    }

    return insertUser
  }


  async getUser(user) {
    const { uuid } = user
    const getUser = await userAuthM.getByUuid(uuid)
    if (getUser.err) {
      return new InternalServerError('fail to get user')
    }
    if (getUser.data.length === 0) {
      return new NotFoundError('user not found')
    }
    return getUser
  }
}

module.exports = UserAuth