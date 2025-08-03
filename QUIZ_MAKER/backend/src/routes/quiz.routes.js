import express from 'express';
import { addQuestionToQuiz, allQuizes, createQuiz } from '../controller/quiz.controller.js';
import  {userAuth} from '../middlewares/user.auth.js';

const router=express.Router();


router.post('/create',userAuth,createQuiz)
router.get('/all-quizes',userAuth,allQuizes)
router.post('/add-question/:id',userAuth,addQuestionToQuiz)


export default router;