const { assert } = require('chai')
const Logger = require('../../../../bin/helpers/utils/logger')

describe('bin/helpers/utils/logger.js', () => {
  describe('class Logger', () => {
    const logger = new Logger()
    describe('.log', () => {
      it('should success to show log', () => {
        const result = logger.log('ctx', 'message', 'scope')
        assert.deepEqual(typeof result, 'object')
      })
    })
    describe('.info', () => {
      it('should success to show info', () => {
        const result = logger.info('ctx', 'message', 'scope')
        assert.deepEqual(typeof result, 'object')
      })
    })
    describe('.error', () => {
      it('should success to show error', () => {
        const result = logger.error('ctx', 'message', 'scope', 'meta')
        assert.deepEqual(typeof result, 'object')
      })
    })
  })
})