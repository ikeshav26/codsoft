import express from 'express';
import { addQuestionToQuiz, allQuizes, createQuiz, getQuizById, getUserCreatedQuizes, getUserPlayedQuizesScore, saveUserPlayerScore } from '../controller/quiz.controller.js';
import  {userAuth} from '../middlewares/user.auth.js';

const router=express.Router();


router.get('/my-quizes',userAuth,getUserCreatedQuizes)
router.post('/submit-quiz/:id',userAuth,saveUserPlayerScore)
router.get('/:id', userAuth,getQuizById)
router.post('/create',userAuth,createQuiz)
router.get('/all-quizes',userAuth,allQuizes)
router.post('/add-question/:id',userAuth,addQuestionToQuiz)
router.get('/my-played/quizes/scores',userAuth,getUserPlayedQuizesScore)



export default router;