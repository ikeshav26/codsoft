import express from 'express';
import { login, Logout, sendOtp, signup, userData, verifyOtp } from '../controller/user.controller.js';
import userAuth from '../middlewares/userAuth.js'


const router=express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',Logout)
router.get('/me',userAuth,userData)
router.post('/send-otp',sendOtp)
router.post('/verify-otp',verifyOtp)


export default router; 