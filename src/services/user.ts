import bcrypt from 'bcrypt'
import {
  RegisterInput,
  TokenPayloadInput,
  LoginInput,
} from '../schema/userSchema'
import CreateError from 'http-errors'
import { prisma } from '../utils/prisma'
import jwt from 'jsonwebtoken'

export const createUser = async ({
  email,
  username,
  password,
}: RegisterInput) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })
    if (existingUser) {
      throw CreateError(409, 'Username or Email already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    })
    return user
  } catch (error) {
    throw error
  }
}

export const generateAccessToken = (payload: TokenPayloadInput) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  })
}

export const generateRefreshToken = (payload: TokenPayloadInput) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  })
}

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
}

export const loginUser = async ({ email, password }: LoginInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (!user) {
      throw CreateError(401, "Email doesn't exist")
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw CreateError(401, 'Invalid email or password')
    }
    return user
  } catch (error) {
    throw error
  }
}
