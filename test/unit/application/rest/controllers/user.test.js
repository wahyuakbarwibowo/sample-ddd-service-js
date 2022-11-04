const sinon = require('sinon')
const { assert } = require('chai')
const User = require('../../../../../bin/application/rest/controllers/user.controller')
const Wrapper = require('../../../../../bin/helpers/utils/wrapper')
const UserDomain = require('../../../../../bin/domain/user.domain')

describe('bin/application/rest/controllers/user.js', () => {

  describe('class User', () => {
    describe('.login', () => {
      beforeEach(() => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        sinon.stub(Wrapper.prototype, 'response').returns({ code: 200 })
      })
      afterEach(() => {
        Wrapper.prototype.responseError.restore()
        Wrapper.prototype.response.restore()
      })
      const user = new User()
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      }
      it('should return 401 if auth is not exist', async () => {
        sinon.stub(UserDomain.prototype, 'login').resolves(new Error())
        const req = { body: {} }
        const result = await user.login(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        UserDomain.prototype.login.restore()
      })
      it('should return success login', async () => {
        sinon.stub(UserDomain.prototype, 'login').resolves({ data: [{ username: 'test', password: 'test' }] })
        const req = { body: { username: 'test', password: 'test' } }
        const result = await user.login(req, res, () => { })
        assert.deepEqual(result, { code: 200 })
        UserDomain.prototype.login.restore()
      })
      it('should return internal server error', async () => {
        const result = await user.login()
        assert.deepEqual(result, { code: 401 })
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
      const user = new User()
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      }
      it('should return 401 if register is error', async () => {
        sinon.stub(UserDomain.prototype, 'register').resolves(new Error())
        const req = { body: {} }
        const result = await user.register(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        UserDomain.prototype.register.restore()
      })
      it('should return success register', async () => {
        sinon.stub(UserDomain.prototype, 'register').resolves({ data: { username: 'test', password: 'test' } })
        const req = { body: { username: 'test', password: 'test' } }
        const result = await user.register(req, res, () => { })
        assert.deepEqual(result, { code: 201 })
        UserDomain.prototype.register.restore()
      })
      it('should return internal server error', async () => {
        const result = await user.register()
        assert.deepEqual(result, { code: 401 })
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
      const user = new User()
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      }
      it('should return 401 if get user is error', async () => {
        sinon.stub(UserDomain.prototype, 'getUser').resolves(new Error())
        const req = { user: {} }
        const result = await user.getUser(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        UserDomain.prototype.getUser.restore()
      })
      it('should return success get user', async () => {
        sinon.stub(UserDomain.prototype, 'getUser').resolves({
          data: [{
            username: 'test',
            password: 'test',
            uuid: 'test',
            name: 'test',
            email: 'test'
          }]
        })
        const req = { user: { username: 'test', password: 'test' } }
        const result = await user.getUser(req, res, () => { })
        assert.deepEqual(result, { code: 200 })
        UserDomain.prototype.getUser.restore()
      })
    })
  })

})
