import fs from "fs"

const dataAccess = {}

fs.readdirSync(`${__dirname}/`)
  .filter(file => file.indexOf(".js") >= 0 && file !== "index.js")
  .forEach(access => {
    const accessName = access.replace(".js", "").replace("-", "")
    const accessFuntions = require(`${__dirname}/${access}`)

    dataAccess[accessName] = accessFuntions.default
  })


module.exports = dataAccess
