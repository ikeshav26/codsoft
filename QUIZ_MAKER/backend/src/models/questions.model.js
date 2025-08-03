import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String], 
  correctAnswer: Number, 
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  createdAt: { type: Date, default: Date.now }
})

const Question = mongoose.model('Question', questionSchema);
export default Question;
