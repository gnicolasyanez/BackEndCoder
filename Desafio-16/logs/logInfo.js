const logger = require("./logger");

const logInfo = ( req, res, next )=> {
  logger.info(`Ruta: ${req.originalUrl} Método: ${req.method}`)
  next ()
}

module.exports = logInfo;