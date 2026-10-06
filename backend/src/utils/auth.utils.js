import jwt from 'jsonwebtoken'
import { configs } from '../configs/config.js'

export const createAccessToken = ({ userId, role }) => {

  const accessToken = jwt.sign({
    userId, role
  }, configs.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  )

  return accessToken
}

export const readAccessToken = (accessToken) =>{
  return jwt.verify(accessToken,configs.ACCESS_TOKEN_SECRET)
}

export const createRefreshToken = ({ userId, role }) => {

  const refreshToken = jwt.sign({
    userId, role
  }, configs.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  )

  return refreshToken
}

export const readRefreshToken = (refreshToken) =>{
  return jwt.verify(refreshToken,configs.REFRESH_TOKEN_SECRET)
}
