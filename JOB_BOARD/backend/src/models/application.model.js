import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicantName:{
    type: String,
    required: true
  },
    applicantEmail: {
    type: String,
    required: true,
    },
    applicantPhone: {
      type: String,
      required: true
    },
  resume: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
