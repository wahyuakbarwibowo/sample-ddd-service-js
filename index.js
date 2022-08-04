const AppServer = require('./bin/application/server')
const config = require('./bin/config')
const Logger = require('./bin/helper/utils/logger')

const appServer = new AppServer()

const { name, port, host } = config.server
const logger = new Logger()

appServer.server.listen(port, host, () => {
  logger.log('server::listen', `${name} server listening on ${host}:${port}`, 'initiate application')
})