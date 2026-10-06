import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { getMe, login, logout, refresh, register } from "../controllers/auth.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router()

// @description register  karo user ko from req.body

router.post('/register', registerValidator,register)

//@description login karna hai user ko or create karna hai new access and refresh Token

router.post('/login',login)
router.post('/refresh',refresh)
router.post('/logout',authMiddleWare,logout)
router.get('/me',authMiddleWare,getMe)

export default router
