const winston = require('winston')
const httpContext = require('express-http-context')
const { formatToTimeZone } = require('date-fns-timezone')

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      exitOnError: false,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      ),
      transports: [
        new winston.transports.Console()
      ]
    })
  }

  formatMessage(message) {
    const reqId = httpContext.get('reqId')
    message = reqId ? `${message} reqId: ${reqId}` : message
    return message
  }

  info(message, meta = undefined) {
    const obj = {
      message: message,
      meta,
      idtime: formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm:ss', { timeZone: 'Asia/Jakarta' })
    }
    return this.logger.info(this.formatMessage(message), obj)
  }

  error(message, error, meta = undefined) {
    const obj = {
      message: message,
      meta,
      idtime: formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm:ss', { timeZone: 'Asia/Jakarta' })
    }
    return this.logger.error(this.formatMessage(message), error, obj)
  }
}

module.exports = Logger