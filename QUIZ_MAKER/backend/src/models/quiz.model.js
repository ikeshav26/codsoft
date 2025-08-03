import mongoose from "mongoose";

const quizSchema=new mongoose.Schema({
   
  title: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  createdAt: { type: Date, default: Date.now }
})

const Quiz=mongoose.model('Quiz', quizSchema);
export default Quiz;