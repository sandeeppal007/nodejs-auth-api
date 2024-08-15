import express from "express";
const  router = express.Router();
import {signup,login,logout,checkAuth,verifyEmail,forgotPassword,forgotPasswordToken} from "../controllers/auth.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"


router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/check-auth',verifyToken,checkAuth)
router.post("/verify-email",verifyEmail)
router.post("/forgot-password",forgotPassword)
router.post("/forgot-password/:token",forgotPasswordToken)




export default router;

