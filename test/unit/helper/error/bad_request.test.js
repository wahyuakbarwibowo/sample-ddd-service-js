const { expect } = require('chai')
const BadRequestError = require('../../../../bin/helper/error/bad_request')

describe('bin/helper/error/bad_request.js', () => {
  describe('class BadRequestError', () => {
    it('should return instance of BadRequestError', () => {
      const result = new BadRequestError('message')
      expect(result).to.be.an.instanceof(BadRequestError)
    })
  })
})