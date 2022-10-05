const sinon = require('sinon')
const { assert } = require('chai')
const UserAuth = require('../../../../bin/infrastructure/repositories/user')
const Postgres = require('../../../../bin/helpers/database/postgres')

describe('bin/infrastructure/repositories/user_auth.js', () => {
  describe('class UserAuth', () => {
    const userAuth = new UserAuth()
    const resultQuery = {
      data: [{
        uuid: 'uuid',
        name: 'name',
        username: 'username',
        email: 'test',
        password: 'password'
      }]
    }

    describe('.getUser', () => {
      it('success to getUser', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves(resultQuery)
        const result = await userAuth.getUser('username', 'password')
        assert.deepEqual(result, { err: null, data: resultQuery.data })
        Postgres.prototype.query.restore()
      })
      it('fail to getUser', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves({ err: new Error('error') })
        const result = await userAuth.getUser('username', 'password')
        assert.deepEqual(result, { err: 'error', data: null })
        Postgres.prototype.query.restore()
      })
    })

    describe('.getByUsername', () => {
      it('success to getByUsername', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves(resultQuery)
        const result = await userAuth.getByUsername('username')
        assert.deepEqual(result, { err: null, data: resultQuery.data })
        Postgres.prototype.query.restore()
      })
      it('fail to getByUsername', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves({ err: new Error('error') })
        const result = await userAuth.getByUsername('username')
        assert.deepEqual(result, { err: 'error', data: null })
        Postgres.prototype.query.restore()
      })
    })

    describe('.getByEmail', () => {
      it('success to getByEmail', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves(resultQuery)
        const result = await userAuth.getByEmail('test')
        assert.deepEqual(result, { err: null, data: resultQuery.data })
        Postgres.prototype.query.restore()
      })
      it('fail to getByEmail', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves({ err: new Error('error') })
        const result = await userAuth.getByEmail('test')
        assert.deepEqual(result, { err: 'error', data: null })
        Postgres.prototype.query.restore()
      })
    })

    describe('.getByUuid', () => {
      it('success to getByUuid', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves(resultQuery)
        const result = await userAuth.getByUuid('uuid')
        assert.deepEqual(result, { err: null, data: resultQuery.data })
        Postgres.prototype.query.restore()
      })
      it('fail to getByUuid', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves({ err: new Error('error') })
        const result = await userAuth.getByUuid('uuid')
        assert.deepEqual(result, { err: 'error', data: null })
        Postgres.prototype.query.restore()
      })
    })

    describe('.insertUser', () => {
      it('success to insertUser', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves(resultQuery)
        const result = await userAuth.insertUser({
          name: 'name',
          username: 'username',
          email: 'test',
          password: 'password'
        })
        assert.deepEqual(result, { err: null, data: resultQuery.data })
        Postgres.prototype.query.restore()
      })
      it('fail to insertUser', async () => {
        sinon.stub(Postgres.prototype, 'query').resolves({ err: new Error('error') })
        const result = await userAuth.insertUser({
          name: 'name',
          username: 'username',
          email: 'test',
          password: 'password'
        })
        assert.deepEqual(result, { err: 'error', data: null })
        Postgres.prototype.query.restore()
      })
    })
  })
})
