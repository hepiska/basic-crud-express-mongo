import useRouter from "routes"
import bodyParser from "body-parser"
import { errorMidleware } from "libs/errorMidleware"
import resJsonOnData from "libs/resJsonOnData"
import cors from "cors"
import morgan from "morgan"
import { connectDb } from "./models"


// import cookieParser from "cookie-parser"
const express = require("express")


connectDb().catch(err => {
  console.log("err", err)
})

const PORT = process.env.PORT || 4000
const app = express()


// parse application/x-www-form-urlencoded
app.use(morgan("combined"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(resJsonOnData)

app.use("/alive", (req, res) => {
  return res.json("alive")
})
app.use("/", useRouter(express))

app.use(errorMidleware)

app.listen({ port: PORT }, () => {
  console.log(`server run on port ${PORT}`)
})
