import auth from "controlers/auth"


module.exports = express =>
  new express.Router()
    .post("/register", auth.register)
    .post("/login", auth.login)
