const { assert } = require('chai')
const sinon = require('sinon')
const Wrapper = require('../../../../bin/helpers/utils/wrapper')
const { InternalServerError } = require('../../../../bin/helpers/error')

describe('bin/helpers/utils/wrapper.js', () => {
  describe('class Wrapper', () => {
    const wrapper = new Wrapper()
    describe('.response', () => {
      it('success to response', () => {
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub().returnsThis(),
          end: sinon.stub()
        }
        wrapper.response(res, 200, { data: 'data' })
        assert.equal(res.status.calledWith(200), true)
        assert.equal(res.json.calledWith({ data: 'data' }), true)
        assert.equal(res.end.calledOnce, true)
      })
    })
    describe('.responseError', () => {
      it('success to responseError', () => {
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub().returnsThis(),
          end: sinon.stub()
        }
        wrapper.responseError(res, new InternalServerError('error'))
        assert.equal(res.status.calledWith(500), true)
        assert.equal(res.json.calledWith({
          message: 'error',
          code: 500,
          data: null,
          success: false,
          meta: undefined
        }), true)
        assert.equal(res.end.calledOnce, true)
      })
    })
  })
})