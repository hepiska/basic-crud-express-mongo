module.exports = express =>
  new express.Router()
    .get("/hallo", (req, res) => {
      return res.json({ name: "kjkjk" })
    })
