import mongoose from 'mongoose';
import express from 'express';
import { createQuiz } from '../controller/quiz.controller.js';
import  {userAuth} from '../middlewares/user.auth.js';

const router=express.Router();


router.post('/create',userAuth,createQuiz)


export default router;