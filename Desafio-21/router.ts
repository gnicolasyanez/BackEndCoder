import { Oak, hbs } from "./deps.ts";

const handle = new hbs.Handlebars()

const colores: string[] = []

const router = new Oak.Router({
  prefix: "/"
})

export default router
  .post("/", async (ctx) => {
    const body = ctx.request.body({type:"form"})
    const value = body.value

    const color = (await value).get("color");
    if (!color) {
      ctx.response.status = 400;
      ctx.response.body = {error: "Debe ingresar un color"}
    } else {
      colores.push(color)
      ctx.response.redirect("/")
    }
  })
  .get("/", async (ctx) => {
    const result: string = await handle.renderView("index", {name: "Facu", colores:colores})
    ctx.response.body = result
    
  })