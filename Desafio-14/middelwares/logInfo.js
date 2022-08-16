const logger = require("../src/logger");

const logInfo = ( req, res, next )=> {
  logger.info(`Ruta: ${req.originalUrl} Método: ${req.method}`)
  next ()
}

module.exports = logInfo;