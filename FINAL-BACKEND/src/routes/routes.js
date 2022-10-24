const logger = require("../logs/logger")
const os = require("os");

const error = (req, res) => {
  logger.warn(`Route: ${req.originalUrl} Method: ${req.method} No Implemented`)
  res.render("error.ejs", {error: {originalUrl: req.originalUrl, method: req.method }})
}

const getOptions = ( req, res ) => {
  const options = {
    port: process.env.PORT || 8080,
    tokenExpiringTime: process.env.TOKEN_EXPIRING_TIME,
    dataBaseUsers: process.env.DATA_BASE_USERS,
    dataBaseProducts: process.env.DATA_BASE_PRODUCTS,
    dataBaseCarts: process.env.DATA_BASE_CARTS,
    dataBaseOrders: process.env.DATA_BASE_ORDERS,
    dataBaseMessages: process.env.DATA_BASE_MESSAGES,
    emailReciever: process.env.GMAIL_RECIEVER,
    emailAdmin: process.env.GMAIL_ADMIN,
    enviroment: process.env.NODE_ENV || "development",
    mode: process.env.MODE || "fork"
  }
  res.render("options.ejs", {options})
}


const getInfo = ( req, res ) => {
  const info= {
    system:process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage.rss(),
    path: process.cwd(),
    processId:process.pid,
    file:__dirname,
    CPUS: os.cpus().length
  }

  res.render("info.ejs", {info})
}

module.exports = {
  getInfo,
  error,
  getOptions
}