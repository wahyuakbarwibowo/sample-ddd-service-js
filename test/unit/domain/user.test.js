const { assert, expect } = require('chai')
const sinon = require('sinon')
const User = require('../../../bin/domain/user.domain')
const Password = require('../../../bin/helpers/utils/password')
const {
  InternalServerError,
  UnauthorizedError,
  UnprocessableEntityError,
  NotFoundError
} = require('../../../bin/helpers/error')
const UserModel = require('../../../bin/infrastructure/repositories/user.repo')

describe('bin/domain/user.js', () => {
  describe('class User', () => {
    let findOneUserStub
    let createUserStub
    beforeEach(() => {
      findOneUserStub = sinon.stub(UserModel, 'findOne')
      createUserStub = sinon.stub(UserModel, 'create')
    })
    afterEach(() => {
      findOneUserStub.restore()
      createUserStub.restore()
    })

    const user = new User()

    describe('.login', () => {
      const payload = {
        username: 'username',
        password: 'password'
      }
      it('should error unauthorized cause data not found', async () => {
        findOneUserStub.resolves(null)
        const result = await user.login(payload)
        expect(result).to.be.an.instanceof(UnauthorizedError)
        findOneUserStub.restore()
      })
      it('should error unauthorized cause password is incorrect', async () => {
        findOneUserStub.resolves({ password: 'password1' })
        const result = await user.login(payload)
        expect(result).to.be.an.instanceof(UnauthorizedError)
        findOneUserStub.restore()
      })
      it('should succes return data', async () => {
        const password = new Password()
        const passwordStub = await password.hash('password')
        findOneUserStub.resolves({ password: passwordStub })
        const result = await user.login(payload)
        assert.deepEqual(result, {
          password: passwordStub
        })
        findOneUserStub.restore()
      })
      it('should return internal server error', async () => {
        findOneUserStub.resolves(null)
        const result = await user.login()
        expect(result).to.be.an.instanceOf(InternalServerError)
        findOneUserStub.restore()
      })
    })

    describe('.register', () => {
      const payload = {
        name: 'name',
        username: 'username',
        email: 'test',
        password: 'password'
      }
      it('should return internal server error', async () => {
        findOneUserStub.resolves(null)
        const result = await user.register()
        expect(result).to.be.an.instanceof(InternalServerError)
        findOneUserStub.restore()
      })
      it('should error username exist', async () => {
        findOneUserStub.resolves({
          username: 'username',
          email: 'test'
        })
        const result = await user.register(payload)
        expect(result).to.be.an.instanceof(UnprocessableEntityError)
        findOneUserStub.restore()
      })
      it('should error email exist', async () => {
        findOneUserStub.onCall(0).resolves(null)
        findOneUserStub.onCall(1).resolves({
          username: 'username',
          email: 'test'
        })
        const result = await user.register(payload)
        expect(result).to.be.an.instanceof(UnprocessableEntityError)
        findOneUserStub.restore()
      })
      it('should success return data', async () => {
        findOneUserStub.onCall(0).resolves(null)
        findOneUserStub.onCall(1).resolves(null)
        createUserStub.resolves({
          username: 'username'
        })
        const result = await user.register(payload)
        assert.deepEqual(result, {
          username: 'username'
        })
        findOneUserStub.restore()
        createUserStub.restore()
      })
    })

    describe('.getUser', () => {
      const payload = {
        uuid: 'uuid',
      }
      it('should error internal server error', async () => {
        const result = await user.getUser()
        expect(result).to.be.an.instanceof(InternalServerError)
      })
      it('should error data not found', async () => {
        findOneUserStub.resolves(null)
        const result = await user.getUser(payload)
        expect(result).to.be.an.instanceof(NotFoundError)
        findOneUserStub.restore()
      })
      it('should success return data', async () => {
        findOneUserStub.resolves({
          uuid: 'uuid'
        })
        const result = await user.getUser(payload)
        assert.deepEqual(result, {
          uuid: 'uuid'
        })
        findOneUserStub.restore()
      })
    })

  })
})