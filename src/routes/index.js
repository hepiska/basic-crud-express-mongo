import fs from "fs"


const createRouter = express => {
  const router = new express.Router()

  fs.readdirSync(`${__dirname}/`)
    .filter(file => file.indexOf(".js") >= 0 && file !== "index.js")
    .forEach(route => {
      const routeName = route.replace(".js", "")
      const routeFunction = require(`${__dirname}/${route}`)(express)

      router.use(`/${routeName}`, routeFunction)
    })

  return router

}


export default createRouter
