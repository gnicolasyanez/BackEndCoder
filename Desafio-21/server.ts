import { Oak } from "./deps.ts";
import router from "./router.ts"

const app = new Oak.Application()

app.use(router.routes())

app.listen({port: 8080 })