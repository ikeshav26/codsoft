import express from 'express';
import { addQuestionToQuiz, allQuizes, createQuiz, getQuizById, getUserCreatedQuizes, getUserPlayedQuizesScore, saveUserPlayerScore } from '../controller/quiz.controller.js';
import  {userAuth} from '../middlewares/user.auth.js';

const router=express.Router();

router.get('/all-quizes',userAuth,allQuizes)
router.get('/my-quizes',userAuth,getUserCreatedQuizes)
router.get('/my-played/quizes/scores',userAuth,getUserPlayedQuizesScore)
router.post('/create',userAuth,createQuiz)
router.post('/add-question/:id',userAuth,addQuestionToQuiz)
router.post('/submit-quiz/:id',userAuth,saveUserPlayerScore)
router.get('/:id', userAuth,getQuizById)



export default router;