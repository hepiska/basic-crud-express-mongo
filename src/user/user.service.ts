import userRepositories from "./user.repositories"
import { CreateUserDTO } from "./user.interface"
import { signToken } from "../utils/jwt"
import BaseError from "../utils/errors/base-error"

export const createUser = async (user: CreateUserDTO) => {
  try {
    const newUser = userRepositories.create(user)
    return await userRepositories.save(newUser)
  } catch (error: any) {
    if (error.code === 11000) {
      throw new BaseError("Email already exists", "app-003", 400)
    }
    throw error
  }
}


export const register = async (user: CreateUserDTO) => {
  return await userRepositories.save(user)
}

export const login = async (email: string, password: string) => {
  const user = await userRepositories.findOne({ where: { email } })
  if (!user) {
    throw new BaseError("User not found or password not match", "app-001", 404)
  }
  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    throw new BaseError("User not found or password not match", "app-002", 404)
  }

  return signToken(user)

}