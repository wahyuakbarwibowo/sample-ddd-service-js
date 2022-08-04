const { expect } = require('chai')
const InternalServerError = require('../../../../bin/helper/error/internal_server_error')

describe('bin/helper/error/internal_server_error.js', () => {
  describe('class InternalServerError', () => {
    it('should return instance of InternalServerError', () => {
      const result = new InternalServerError('message')
      expect(result).to.be.an.instanceof(InternalServerError)
    })
  })
})