import express from 'express';
import { createJob, deleteJob, getAllJobs, getEmployerCreatedJobs, getJobById } from '../controller/job.controller.js';
import  userAuth  from '../middlewares/userAuth.js';

const router=express.Router();


router.post('/create-job',userAuth,createJob)
router.get('/employer-jobs',userAuth,getEmployerCreatedJobs)
router.get('/all-jobs', userAuth, getAllJobs)
router.delete('/delete-job/:id',userAuth,deleteJob)
router.get('/get-job/:id',userAuth,getJobById)

export default router;