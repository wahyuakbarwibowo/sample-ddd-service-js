const { expect } = require('chai')
const ServiceUnavailableError = require('../../../../bin/helpers/error/service_unavailable')

describe('bin/helpers/error/service_unavailable.js', () => {
  describe('class ServiceUnavailableError', () => {
    it('should return instance of ServiceUnavailableError', () => {
      const result = new ServiceUnavailableError('message')
      expect(result).to.be.an.instanceof(ServiceUnavailableError)
    })
  })
})