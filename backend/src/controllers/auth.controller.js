import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { createAccessToken, createRefreshToken, readRefreshToken } from "../utils/auth.utils.js";
import { configs } from "../configs/config.js";

// Cookie security configuration:
// 1. httpOnly: Blocks malicious JS/XSS scripts from stealing the cookie
// 2. secure: Encrypts cookie transmission; only sent over HTTPS in production
// 3. sameSite: Blocks CSRF attacks (other tabs cannot hijack this cookie)
// 4. maxAge: Cookie survives for 7 days (matching refreshToken life) instead of dying on browser close
const cookieOptions = {
  httpOnly: true,
  secure: configs.NODE_ENV === "production",
  sameSite: configs.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({
      message: "Email is Already Exists"
    });
  }

  const user = await userModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10)
  });

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role
  });

  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
  });

  res.cookie("refreshToken", refreshToken, cookieOptions);

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken
  });

  return res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken
    }
  });
};


export const login = async (req, res) => {

  const { email, password } = req.body
  const user = await userModel.findOne({ email })

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role
  })

  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
  })

  res.cookie("refreshToken", refreshToken, cookieOptions)

  await userModel.findOneAndUpdate({ email }, {
    refreshToken
  })

  res.status(200).json({
    message: "login successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken
    }
  });
};

export const refresh = async (req, res) => {

  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token  is required"
    })
  }

  try {

    const decode = readRefreshToken(refreshToken)

    const { userId } = decode

    const user = await userModel.findById(userId)
    // case - agar user hi delete hogya toh?
    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token"
      });
    }

    if (refreshToken !== user.refreshToken) {

      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null
      })

      return res.status(401).json({
        message: "Refresh token is mismatched"
      })
    }

    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role
    })

    const newRefreshToken = createRefreshToken({
      userId: user._id,
      role: user.role
    })

    res.cookie("refreshToken", newRefreshToken, cookieOptions)

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken
    })

    res.status(200).json({
      message: "Tokens rotated successfully.",
      data: {
        user: {
          id: user._id,
          role: user.role,
          name: user.name,
          email: user.email
        },
        accessToken
      }
    })



  } catch (error) {
    console.log('refresherror', error.message);

    return res.status(401).json({
      message: "Invalid refresh token"
    })


  }
}

export const logout = async (req, res) => {

  const { userId } = req.user

  const user = await userModel.findByIdAndUpdate(userId, {
    refreshToken: null
  })

  res.clearCookie('refreshToken', cookieOptions)

  return res.status(200).json({
    message: "Logged out successfully",
    user: user.name
  });


}

export const getMe = async (req, res) => {

  const { userId } = req.user

  const user = await userModel.findById(userId)

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }

  res.status(200).json({
    message: "user fetched successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        role: user.role
      }
    }
  })

}
