const { assert } = require('chai')
const sinon = require('sinon')
const UserAuth = require('../../../../../bin/application/rest/validation/user.js.js')
const Wrapper = require('../../../../../bin/helpers/utils/wrapper')

describe('bin/application/rest/validation/user_auth.js', () => {

  describe('class UserAuth', () => {

    describe('.login', () => {
      beforeEach(() => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 422 })
      })
      afterEach(() => {
        Wrapper.prototype.responseError.restore()
      })
      const userAuth = new UserAuth()
      it('should return 422 if validation error', () => {
        const req = {
          body: {
            username: '',
            password: '',
          }
        }
        const result = userAuth.login(req, {}, () => { })
        assert.deepEqual(result, { code: 422 })
      })
      it('should use next function cause validation not error', () => {
        const req = {
          body: {
            username: 'test',
            password: 'test'
          }
        }
        const result = userAuth.login(req, {}, () => { })
        assert.deepEqual(result, undefined)
      })
    })

    describe('.register', () => {
      beforeEach(() => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 422 })
      })
      afterEach(() => {
        Wrapper.prototype.responseError.restore()
      })
      const userAuth = new UserAuth()
      it('should return 422 if validation error', () => {
        const req = {
          body: {
            username: '',
            password: '',
          }
        }
        const result = userAuth.register(req, {}, () => { })
        assert.deepEqual(result, { code: 422 })
      })
      it('should use next function cause validation not error', () => {
        const req = {
          body: {
            name: 'test',
            username: 'test',
            email: 'test',
            password: 'test',
          }
        }
        const result = userAuth.register(req, {}, () => { })
        assert.deepEqual(result, undefined)
      })
    })

  })

})