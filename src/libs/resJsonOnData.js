module.exports = (req, res, next) => {
  const resJsonOld = res.json


  res.json = args => {
    args = {
      data: args,
      statusCode: res.statusCode
    }
    Reflect.apply(resJsonOld, res, [args])
  }

  return next()
}
