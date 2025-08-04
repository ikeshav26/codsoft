import Question from '../models/questions.model.js';
import Quiz from '../models/quiz.model.js';
import User from '../models/user.model.js'; 
import Score from '../models/score.model.js';


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
        const {id}=req.params;
        const quizId=id;
        
        // Validate if ID is provided and is a valid ObjectId format
        if(!quizId || quizId === 'undefined' || quizId === 'null') {
            return res.status(400).json({message: 'Quiz ID is required'});
        }
        
        // Check if ID is a valid MongoDB ObjectId format (24 character hex string)
        if(!/^[0-9a-fA-F]{24}$/.test(quizId)) {
            return res.status(400).json({message: 'Invalid Quiz ID format'});
        }
        
        console.log("Adding question to quiz with ID:", quizId);
        
        const {questionText,options,correctAnswer}=req.body;
        if(!questionText || !options || correctAnswer === undefined){
            return res.status(400).json({message: 'All fields are required'});
        }
        

        const quiz = await Quiz.findOne({_id: quizId});
        console.log("Quiz found:", quiz);
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


export const allQuizes=async(req,res)=>{
    try{
        const quizes=await Quiz.find().populate('createdBy', 'name').populate('questions').sort({createdAt: -1});
        res.status(200).json(quizes);
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});   
    }
}


export const getQuizById=async(req,res)=>{
    try{
        const {id}=req.params;
        
        // Validate if ID is provided and is a valid ObjectId format
        if(!id || id === 'undefined' || id === 'null') {
            return res.status(400).json({message: 'Quiz ID is required'});
        }
        
        // Check if ID is a valid MongoDB ObjectId format (24 character hex string)
        if(!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({message: 'Invalid Quiz ID format'});
        }
        
        const quiz=await Quiz.findById(id).populate('createdBy', 'username').populate('questions');
        if(!quiz){
            return res.status(404).json({message: 'Quiz not found'});
        }
        res.status(200).json({message: 'Quiz fetched successfully', quiz});
    }catch(err){
        console.error('Error in getQuizById:', err);
        res.status(500).json({message: 'Internal server error'});
    }
}


export const getUserCreatedQuizes=async(req,res)=>{
    try{
        console.log("Fetching user created quizzes for user ID:", req.user);
        const userId=req.user;
        const quizes=await Quiz.find({createdBy: userId}).sort({createdAt: -1});
        res.status(200).json({message: 'User created quizzes fetched successfully', quizes});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}


export const saveUserPlayerScore=async(req,res)=>{
    try{
        const {score}=req.body;
        const userId=req.user;
        const quizId=req.params.id;

        // Validate if ID is provided and is a valid ObjectId format
        if(!quizId || quizId === 'undefined' || quizId === 'null') {
            return res.status(400).json({message: 'Quiz ID is required'});
        }
        
        // Check if ID is a valid MongoDB ObjectId format (24 character hex string)
        if(!/^[0-9a-fA-F]{24}$/.test(quizId)) {
            return res.status(400).json({message: 'Invalid Quiz ID format'});
        }

        console.log("Saving score for user ID:", userId, "for quiz ID:", quizId, "with score:", score);


        const scoreEntry=new Score({
            userId,
            quizId,
            score,
            createdAt: new Date()
        })
        await scoreEntry.save();
        res.status(201).json({message: 'Score saved successfully', scoreEntry});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}


export const getUserPlayedQuizesScore=async(req,res)=>{
    try{
        const userId=req.user;
        const scores=await Score.find({userId}).populate('quizId', 'title description questions').sort({createdAt: -1});
        if(!scores || scores.length === 0){
            return res.status(404).json({message: 'No scores found for this user'});
        }

        res.status(200).json({message: 'User scores fetched successfully', scores});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const deleteQuiz=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!id || id === 'undefined' || id === 'null') {
            return res.status(400).json({message: 'Quiz ID is required'});
        }

        const quiz=await Quiz.findByIdAndDelete(id);
        if(!quiz){
            return res.status(404).json({message: 'Quiz not found'});
        }
        res.status(200).json({message: 'Quiz deleted successfully', quiz});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}