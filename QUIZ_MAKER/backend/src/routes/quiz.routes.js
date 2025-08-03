import express from 'express';
import { addQuestionToQuiz, createQuiz } from '../controller/quiz.controller.js';
import  {userAuth} from '../middlewares/user.auth.js';

const router=express.Router();


router.post('/create',userAuth,createQuiz)
router.post('/add-question/:id',userAuth,addQuestionToQuiz)


export default router;