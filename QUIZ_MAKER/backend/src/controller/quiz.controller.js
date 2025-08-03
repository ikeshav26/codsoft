import Question from '../models/questions.model.js';
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


export const addQuestionToQuiz = async (req, res) => {
    try{
        const {questionText,options,correctAnswer}=req.body;
        const {quizId} = req.params;
        if(!questionText || !options || correctAnswer === undefined){
            return res.status(400).json({message: 'All fields are required'});
        }

        const quiz = await Quiz.findOne(quizId);
        if(!quiz){
            return res.status(404).json({message: 'Quiz not found'});
        }

        const question = new Question({
            questionText,
            options,
            correctAnswer,
            quiz: quiz._id,
            createdAt: new Date()
        });
        await question.save();

        quiz.questions.push(question._id);
        await quiz.save();

        res.status(201).json({message: 'Question added successfully', question});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
}
}
