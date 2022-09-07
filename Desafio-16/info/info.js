const os = require("os");

const getInfo = ( req, res ) => {
  const info= {
    args: process.argv,
    sistema:process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage.rss(),
    path: process.cwd(),
    processId:process.pid,
    file:__dirname,
    CPUS: os.cpus().length
  }
  info.keys= Object.keys(info.args)
  res.render("info", {info:info})
}

module.exports = getInfo