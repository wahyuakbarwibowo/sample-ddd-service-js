const { assert, expect } = require('chai')
const sinon = require('sinon')
const User = require('../../../bin/domain/user')
const Password = require('../../../bin/helpers/utils/password')
const {
  InternalServerError,
  UnauthorizedError,
  UnprocessableEntityError,
  NotFoundError
} = require('../../../bin/helpers/error')
const UserModel = require('../../../bin/infrastructure/repositories/user')

describe('bin/domain/user.js', () => {
  describe('class User', () => {
    let findOneUserStub
    beforeEach(() => {
      findOneUserStub = sinon.stub(UserModel, 'findOne')
    })
    afterEach(() => {
      findOneUserStub.restore()
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
        console.log(result)
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
        findOneUserStub.resolves({ data: [{ password: 'password' }] })
        sinon.stub(Password, 'compare').returns(true)
        const result = await user.login(payload)
        assert.deepEqual(result, {
          data: [{
            password: 'password'
          }]
        })
        Password.compare.restore()
        findOneUserStub.restore()
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
        findOneUserStub.resolves({ err: true })
        const user = new user({
          getByUsername: sinon.fake.resolves({ err: true }),
        })
        const result = await user.register(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        findOneUserStub.restore()
      })
      it('should error username exist', async () => {
        findOneUserStub.resolves({
          data: [{
            username: 'username',
            email: 'test'
          }]
        })
        const result = await user.register(payload)
        expect(result).to.be.an.instanceof(UnprocessableEntityError)
        findOneUserStub.restore()
      })
      it('should error get user by email from repository', async () => {
        findOneUserStub.resolves({ data: [] })
        sinon.stub(UserModel, 'getByEmail').resolves({ err: true })
        const result = await user.register(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        findOneUserStub.restore()
        UserModel.getByEmail.restore()
      })
      it('should error email exist', async () => {
        findOneUserStub.resolves({ data: [] })
        sinon.stub(UserModel, 'getByEmail').resolves({
          data: [{
            email: 'test'
          }]
        })
        const result = await user.register(payload)
        expect(result).to.be.an.instanceof(UnprocessableEntityError)
        findOneUserStub.restore()
        UserModel.getByEmail.restore()
      })
      it('should error create user from repository', async () => {
        findOneUserStub.resolves({ data: [] })
        sinon.stub(UserModel, 'getByEmail').resolves({ data: [] })
        sinon.stub(UserModel, 'insertUser').resolves({ err: true })
        sinon.stub(Password, 'hash').returns('password')
        const result = await user.register(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        Password.hash.restore()
        findOneUserStub.restore()
        UserModel.getByEmail.restore()
        UserModel.insertUser.restore()
      })
      it('should success return data', async () => {
        findOneUserStub.resolves({ data: [] })
        sinon.stub(UserModel, 'getByEmail').resolves({ data: [] })
        sinon.stub(UserModel, 'insertUser').resolves({ data: {} })
        sinon.stub(Password, 'hash').returns('password')
        const result = await user.register(payload)
        assert.deepEqual(result, {
          data: {}
        })
        Password.hash.restore()
        findOneUserStub.restore()
        UserModel.getByEmail.restore()
        UserModel.insertUser.restore()
      })
    })

    describe('.getUser', () => {
      const payload = {
        uuid: 'uuid',
      }
      it('should error get user from repository', async () => {
        findOneUserStub.resolves({ err: true })
        const result = await user.getUser(payload)
        expect(result).to.be.an.instanceof(InternalServerError)
        findOneUserStub.restore()
      })
      it('should error data not found', async () => {
        findOneUserStub.resolves({ data: [] })
        const result = await user.getUser(payload)
        expect(result).to.be.an.instanceof(NotFoundError)
        findOneUserStub.restore()
      })
      it('should success return data', async () => {
        findOneUserStub.resolves({
          data: [{
            uuid: 'uuid',
          }]
        })
        const result = await user.getUser(payload)
        assert.deepEqual(result, {
          data: [{
            uuid: 'uuid'
          }]
        })
        findOneUserStub.restore()
      })
    })

  })
})