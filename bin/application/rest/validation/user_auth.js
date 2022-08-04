const Joi = require('joi')
const { UnprocessableEntityError } = require('../../../helper/error')
const Wrapper = require('../../../helper/utils/wrapper')
const wrapper = new Wrapper()

class UserAuth {

  login(req, res, next) {
    const payload = {
      ...req.body
    }
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    })
    const { error } = schema.validate(payload, { abortEarly: false })
    if (error) {
      const data = error.details.map(item => {
        const field = item.path[item.path.length - 1]
        return {
          message: item.message.replace(/"/g, ''),
          field
        }
      })
      return wrapper.responseError(res, new UnprocessableEntityError('validation error', data))
    }
    next()
  }

  register(req, res, next) {
    const payload = {
      ...req.body
    }
    const schema = Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
    const { error } = schema.validate(payload, { abortEarly: false })
    if (error) {
      const data = error.details.map(item => {
        const field = item.path[item.path.length - 1]
        return {
          message: item.message.replace(/"/g, ''),
          field
        }
      })
      return wrapper.responseError(res, new UnprocessableEntityError('validation error', data))
    }
    next()
  }
}

module.exports = UserAuth