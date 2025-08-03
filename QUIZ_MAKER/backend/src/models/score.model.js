import mongoose from 'mongoose';


const scoreSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Score = mongoose.model('Score', scoreSchema);
export default Score;