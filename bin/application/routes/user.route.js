const router = require('express').Router()
const BasicAuth = require('../rest/authorization/basic_auth')
const BearerAuth = require('../rest/authorization/bearer_auth')
const UserValid = require('../rest/validation/user.validation')
const UserControl = require('../rest/controllers/user.controller')

const basicAuth = new BasicAuth()
const bearerAuth = new BearerAuth()
const userValid = new UserValid()
const userControl = new UserControl()

router.post('/v1/auth/login', basicAuth.isAuthenticated, userValid.login, userControl.login)
router.post('/v1/auth/register', basicAuth.isAuthenticated, userValid.register, userControl.register)
router.get('/v1/auth/profile', bearerAuth.isAuthenticated, userControl.getUser)

module.exports = router