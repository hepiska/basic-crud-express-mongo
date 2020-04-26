import fs from "fs"

const controlers = {}

fs.readdirSync(`${__dirname}/`)
  .filter(file => file.indexOf(".js") >= 0 && file !== "index.js")
  .forEach(control => {
    const controlerName = control.replace(".js", "").replace("-", "")
    const controlerFuntions = require(`${__dirname}/${control}`)

    controlers[controlerName] = controlerFuntions.default
  })


module.exports = controlers
