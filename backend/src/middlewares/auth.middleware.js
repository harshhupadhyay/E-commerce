import { readAccessToken } from "../utils/auth.utils.js"


export const authMiddleWare = async (req, res, next) => {

  const accessToken = req.headers.authorization?.split(" ")[1]

  if (!accessToken) {
    return res.status(401).json({
      message: "Access token not found in the request header"
    })
  }

  try {
    const decode = readAccessToken(accessToken)
    req.user = decode
    next()

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired access token"
    })
  }

}

export const authAdminMiddleWare = (req, res, next) => {

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: "user is not authorized to  do this action"
    })
  }
  next()
}
