const { assert, expect } = require('chai')
const sinon = require('sinon')
const UserAuth = require('../../../bin/domain/user_auth')
const Password = require('../../../bin/helper/utils/password')
const {
  InternalServerError,
  UnauthorizedError,
  UnprocessableEntityError,
  NotFoundError
} = require('../../../bin/helper/error')
const UserAuthModel = require('../../../bin/infrastructure/repositories/user_auth')

describe('bin/domain/user_auth.js', () => {
  describe('class UserAuth', () => {
    const userAuth = new UserAuth()

    describe('.login', () => {
      const payload = {
        username: 'username',
        password: 'password'
      }
      it('should error get user from repository', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ err: true })
        const result = await userAuth.login(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        UserAuthModel.prototype.getByUsername.restore()
      })
      it('should error unauthorized cause data not found', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ data: [] })
        const result = await userAuth.login(payload)
        expect(result).to.be.an.instanceof(UnauthorizedError)
        UserAuthModel.prototype.getByUsername.restore()
      })
      it('should error unauthorized cause password is incorrect', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ data: [{ password: 'password1' }] })
        const result = await userAuth.login(payload)
        expect(result).to.be.an.instanceof(UnauthorizedError)
        UserAuthModel.prototype.getByUsername.restore()
      })
      it('should succes return data', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ data: [{ password: 'password' }] })
        sinon.stub(Password.prototype, 'compare').returns(true)
        const result = await userAuth.login(payload)
        assert.deepEqual(result, {
          data: [{
            password: 'password'
          }]
        })
        Password.prototype.compare.restore()
        UserAuthModel.prototype.getByUsername.restore()
      })

    })

    describe('.register', () => {
      const payload = {
        uuid: 'uuid',
        name: 'name',
        username: 'username',
        email: 'test',
        password: 'password'
      }
      it('should error get user by username from repository', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ err: true })
        const userAuth = new UserAuth({
          getByUsername: sinon.fake.resolves({ err: true }),
        })
        const result = await userAuth.register(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        UserAuthModel.prototype.getByUsername.restore()
      })
      it('should error username exist', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({
          data: [{
            username: 'username',
            email: 'test'
          }]
        })
        const result = await userAuth.register(payload)
        expect(result).to.be.an.instanceof(UnprocessableEntityError)
        UserAuthModel.prototype.getByUsername.restore()
      })
      it('should error get user by email from repository', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ data: [] })
        sinon.stub(UserAuthModel.prototype, 'getByEmail').resolves({ err: true })
        const result = await userAuth.register(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        UserAuthModel.prototype.getByUsername.restore()
        UserAuthModel.prototype.getByEmail.restore()
      })
      it('should error email exist', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ data: [] })
        sinon.stub(UserAuthModel.prototype, 'getByEmail').resolves({
          data: [{
            email: 'test'
          }]
        })
        const result = await userAuth.register(payload)
        expect(result).to.be.an.instanceof(UnprocessableEntityError)
        UserAuthModel.prototype.getByUsername.restore()
        UserAuthModel.prototype.getByEmail.restore()
      })
      it('should error create user from repository', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ data: [] })
        sinon.stub(UserAuthModel.prototype, 'getByEmail').resolves({ data: [] })
        sinon.stub(UserAuthModel.prototype, 'insertUser').resolves({ err: true })
        sinon.stub(Password.prototype, 'hash').returns('password')
        const result = await userAuth.register(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        Password.prototype.hash.restore()
        UserAuthModel.prototype.getByUsername.restore()
        UserAuthModel.prototype.getByEmail.restore()
        UserAuthModel.prototype.insertUser.restore()
      })
      it('should success return data', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUsername').resolves({ data: [] })
        sinon.stub(UserAuthModel.prototype, 'getByEmail').resolves({ data: [] })
        sinon.stub(UserAuthModel.prototype, 'insertUser').resolves({ data: {} })
        sinon.stub(Password.prototype, 'hash').returns('password')
        const result = await userAuth.register(payload)
        assert.deepEqual(result, {
          data: {}
        })
        Password.prototype.hash.restore()
        UserAuthModel.prototype.getByUsername.restore()
        UserAuthModel.prototype.getByEmail.restore()
        UserAuthModel.prototype.insertUser.restore()
      })
    })

    describe('.getUser', () => {
      const payload = {
        uuid: 'uuid',
      }
      it('should error get user from repository', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUuid').resolves({ err: true })
        const result = await userAuth.getUser(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        UserAuthModel.prototype.getByUuid.restore()
      })
      it('should error data not found', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUuid').resolves({ data: [] })
        const result = await userAuth.getUser(payload)
        expect(result).to.be.an.instanceof(NotFoundError)
        UserAuthModel.prototype.getByUuid.restore()
      })
      it('should success return data', async () => {
        sinon.stub(UserAuthModel.prototype, 'getByUuid').resolves({
          data: [{
            uuid: 'uuid',
          }]
        })
        const result = await userAuth.getUser(payload)
        assert.deepEqual(result, {
          data: [{
            uuid: 'uuid'
          }]
        })
        UserAuthModel.prototype.getByUuid.restore()
      })
    })

  })
})