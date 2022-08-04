const { expect } = require('chai')
const UnprocessableEntityError = require('../../../../bin/helper/error/unprocessable_entity')

describe('bin/helper/error/unprocessable_entity.js', () => {
  describe('class UnprocessableEntityError', () => {
    it('should return instance of UnprocessableEntityError', () => {
      const result = new UnprocessableEntityError('message')
      expect(result).to.be.an.instanceof(UnprocessableEntityError)
    })
  })
})