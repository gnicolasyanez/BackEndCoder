const router = require("koa-router");
const os = require("os");

const routes = router()

routes.get("/", async ctx => {
  await ctx.render("main", {name:"Facu"})
})

routes.get("/info", async ctx => {
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
  await ctx.render("info", {info:info})
})

module.exports = routes