// import Question from '../models/question.model.js';
import Quiz from '../models/quiz.model.js';
import User from '../models/user.model.js'; 


export const createQuiz=async(req,res)=>{
    try{
        const {title, description} = req.body;
        if(!title || !description){
            return res.status(400).json({message: 'Title and description are required'});
        }
        const quiz = new Quiz({
            title,
            description,
            createdBy: req.user._id, 
            questions: [], 
            createdAt: new Date()
        });
        await quiz.save();
        res.status(201).json({message: 'Quiz created successfully', quiz});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}