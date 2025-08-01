import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobType: {
        type:String,
        required: true,
    },
    experience: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;
