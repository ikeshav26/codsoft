import express from 'express';
import { login, Logout, signup, userData } from '../controller/user.controller.js';
import userAuth from '../middlewares/userAuth.js'


const router=express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',Logout)
router.get('/me',userAuth,userData)


export default router;