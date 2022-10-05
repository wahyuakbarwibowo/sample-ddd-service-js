const { expect } = require('chai')
const NotFoundError = require('../../../../bin/helpers/error/not_found')

describe('bin/helpers/error/not_found.js', () => {
  describe('class NotFoundError', () => {
    it('should return instance of NotFoundError', () => {
      const result = new NotFoundError('message')
      expect(result).to.be.an.instanceof(NotFoundError)
    })
  })
})