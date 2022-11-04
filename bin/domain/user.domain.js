const _ = require('lodash')
const {
  InternalServerError,
  UnprocessableEntityError,
  UnauthorizedError,
  NotFoundError
} = require('../helpers/error')
const Password = require('../helpers/utils/password')
const UserModel = require('../infrastructure/repositories/user.repo')

const passwordUtils = new Password()

class User {

  async login(payload) {
    try {
      const { username, password } = payload

      const getUser = await UserModel.findOne({
        where: {
          username
        }
      })
      if (_.isNil(getUser)) {
        return new UnauthorizedError('username or password is incorrect')
      }

      const isMatch = await passwordUtils.compare(password, getUser.password)
      if (!isMatch) {
        return new UnauthorizedError('username or password is incorrect')
      }
      return getUser
    } catch (error) {
      return new InternalServerError(error.message)
    }
  }

  async register(payload) {
    try {
      const { name, username, email, password } = payload

      // check username exist
      const getUser = await UserModel.findOne({
        where: {
          username
        }
      })
      if (!_.isNil(getUser)) {
        return new UnprocessableEntityError('username already exists', [{
          field: 'username',
          message: 'username already exists'
        }])
      }

      // check email exist
      const getEmail = await UserModel.findOne({
        where: {
          email
        }
      })
      if (!_.isNil(getEmail)) {
        return new UnprocessableEntityError('email already exists', [{
          field: 'email',
          message: 'email already exists'
        }])
      }

      const hashPassword = await passwordUtils.hash(password)

      const createUser = await UserModel.create({
        name,
        username,
        email,
        password: hashPassword
      })
      return createUser
    } catch (error) {
      return new InternalServerError(error.message)
    }
  }


  async getUser(user) {
    try {
      const { uuid } = user
      const getUser = await UserModel.findOne({
        where: {
          uuid
        }
      })
      if (_.isNil(getUser)) {
        return new NotFoundError('user not found')
      }
      return getUser
    } catch (error) {
      return new InternalServerError(error.message)
    }
  }
}

module.exports = User