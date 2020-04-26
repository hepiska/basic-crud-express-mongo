const jwt = require("jsonwebtoken")

import userData from "dataAccess/user"

export const signJwt = data => {
  return jwt.sign({ ...data }, process.env.SECRET)
}

export const verifyJwt = token => jwt.verify(token, process.env.SECRET)

export const decodeJwt = token => jwt.decode(token)

export const reqUserFromToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization
    let user = verifyJwt(token)

    user = await userData.findOneByID(user.id)
    req.user = user

    return next()
  } catch (err) {
    const error = new Error(err)

    error.statusCode = 401

    return next(error)
  }
}


export default jwt
