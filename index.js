const AppServer = require('./bin/application/server')
const config = require('./bin/application/config')
const Logger = require('./bin/helpers/utils/logger')

const appServer = new AppServer()

const { name, port, host } = config.get('/server')
const logger = new Logger()

appServer.server.listen(port, host, () => {
  logger.log('server::listen', `${name} server listening on ${host}:${port}`, 'initiate application')
})