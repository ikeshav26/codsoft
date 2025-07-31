import express from 'express';
import { createJob, getAllJobs, getEmployerCreatedJobs } from '../controller/job.controller.js';
import  userAuth  from '../middlewares/userAuth.js';

const router=express.Router();


router.post('/create-job',userAuth,createJob)
router.get('/employer-jobs',userAuth,getEmployerCreatedJobs)
router.get('/all-jobs', userAuth, getAllJobs)


export default router;