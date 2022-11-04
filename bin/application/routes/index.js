const package = require('../../../package.json')
const router = require('express').Router()
const Wrapper = require('../../helpers/utils/wrapper')
const {
  NotFoundError,
  ServiceUnavailableError
} = require('../../helpers/error')
const user = require('./user.route')

const wrapper = new Wrapper()

router.use('/', user)

// health check handler
router.get('/health', (_req, res) => {
  try {
    return wrapper.response(res, 200, {
      message: 'success to get health check data',
      code: 200,
      success: true,
      data: {
        uptime: process.uptime(),
        timestamp: Date.now()
      }
    })
  } catch (err) {
    return wrapper.responseError(res, new ServiceUnavailableError(err.message))
  }
})

// default resoure handler
router.get('/', (_req, res) => {
  return wrapper.response(res, 200, {
    message: `${package.name} server is running properly`,
    code: 200,
    data: null,
    success: true
  })
})

// resource not found handler
router.use((_req, res) => {
  wrapper.responseError(res, new NotFoundError('resource not found'))
})

module.exports = router