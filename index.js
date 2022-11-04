const AppServer = require('./bin/application/server')
const config = require('./bin/application/config')
const Logger = require('./bin/helpers/utils/logger')

const appServer = new AppServer()

const { name, port } = config.get('/server')
const logger = new Logger()

appServer.server.listen(port, () => {
  logger.info(`server::listen ${name} server listening on port ${port}`, 'initiate application')
})