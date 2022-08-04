const router = require('express').Router()
const BasicAuth = require('../rest/authorization/basic_auth')
const BearerAuth = require('../rest/authorization/bearer_auth')
const UserAuthValid = require('../rest/validation/user_auth')
const UserAuthControl = require('../rest/controllers/user_auth')

const basicAuth = new BasicAuth()
const bearerAuth = new BearerAuth()
const userAuthValid = new UserAuthValid()
const userAuthControl = new UserAuthControl()

router.post('/v1/auth/login', basicAuth.isAuthenticated, userAuthValid.login, userAuthControl.login)
router.post('/v1/auth/register', basicAuth.isAuthenticated, userAuthValid.register, userAuthControl.register)
router.get('/v1/auth/profile', bearerAuth.isAuthenticated, userAuthControl.getUser)

module.exports = router