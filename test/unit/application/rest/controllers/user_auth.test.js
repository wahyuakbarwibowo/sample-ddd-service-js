const sinon = require('sinon')
const { assert } = require('chai')
const UserAuth = require('../../../../../bin/application/rest/controllers/user_auth')
const Wrapper = require('../../../../../bin/helper/utils/wrapper')
const UserAuthDomain = require('../../../../../bin/domain/user_auth')

describe('bin/application/rest/controllers/user_auth.js', () => {

  describe('class UserAuth', () => {
    describe('.login', () => {
      beforeEach(() => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        sinon.stub(Wrapper.prototype, 'response').returns({ code: 200 })
      })
      afterEach(() => {
        Wrapper.prototype.responseError.restore()
        Wrapper.prototype.response.restore()
      })
      const userAuth = new UserAuth()
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      }
      it('should return 401 if auth is not exist', async () => {
        sinon.stub(UserAuthDomain.prototype, 'login').resolves(new Error())
        const req = { body: {} }
        const result = await userAuth.login(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        UserAuthDomain.prototype.login.restore()
      })
      it('should return 401 if username is not exist', async () => {
        sinon.stub(UserAuthDomain.prototype, 'login').resolves({ data: [] })
        const req = { body: { username: 'test', password: 'test' } }
        const result = await userAuth.login(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        UserAuthDomain.prototype.login.restore()
      })
      it('should return success login', async () => {
        sinon.stub(UserAuthDomain.prototype, 'login').resolves({ data: [{ username: 'test', password: 'test' }] })
        const req = { body: { username: 'test', password: 'test' } }
        const result = await userAuth.login(req, res, () => { })
        assert.deepEqual(result, { code: 200 })
        UserAuthDomain.prototype.login.restore()
      })
    })

    describe('.register', () => {
      beforeEach(() => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        sinon.stub(Wrapper.prototype, 'response').returns({ code: 201 })
      })
      afterEach(() => {
        Wrapper.prototype.responseError.restore()
        Wrapper.prototype.response.restore()
      })
      const userAuth = new UserAuth()
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      }
      it('should return 401 if register is error', async () => {
        sinon.stub(UserAuthDomain.prototype, 'register').resolves(new Error())
        const req = { body: {} }
        const result = await userAuth.register(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        UserAuthDomain.prototype.register.restore()
      })
      it('should return success register', async () => {
        sinon.stub(UserAuthDomain.prototype, 'register').resolves({ data: { username: 'test', password: 'test' } })
        const req = { body: { username: 'test', password: 'test' } }
        const result = await userAuth.register(req, res, () => { })
        assert.deepEqual(result, { code: 201 })
        UserAuthDomain.prototype.register.restore()
      })
    })

    describe('.getUser', () => {
      beforeEach(() => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        sinon.stub(Wrapper.prototype, 'response').returns({ code: 200 })
      })
      afterEach(() => {
        Wrapper.prototype.responseError.restore()
        Wrapper.prototype.response.restore()
      })
      const userAuth = new UserAuth()
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      }
      it('should return 401 if get user is error', async () => {
        sinon.stub(UserAuthDomain.prototype, 'getUser').resolves(new Error())
        const req = { user: {} }
        const result = await userAuth.getUser(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        UserAuthDomain.prototype.getUser.restore()
      })
      it('should return success get user', async () => {
        sinon.stub(UserAuthDomain.prototype, 'getUser').resolves({
          data: [{
            username: 'test',
            password: 'test',
            uuid: 'test',
            name: 'test',
            email: 'test'
          }]
        })
        const req = { user: { username: 'test', password: 'test' } }
        const result = await userAuth.getUser(req, res, () => { })
        assert.deepEqual(result, { code: 200 })
        UserAuthDomain.prototype.getUser.restore()
      })
    })
  })

})
