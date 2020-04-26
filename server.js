require("dotenv").config()

require("app-module-path").addPath(`${__dirname}/dist`)
require("./dist")
