import express from 'express';
import { acceptApplication, applyForJob, createJob, deleteJob, getAllJobs, getEmployerCreatedJobs, getJobById, rejectApplication, userApplications } from '../controller/job.controller.js';
import  userAuth  from '../middlewares/userAuth.js';

const router=express.Router();


router.post('/create-job',userAuth,createJob)
router.get('/employer-jobs',userAuth,getEmployerCreatedJobs)
router.get('/all-jobs', userAuth, getAllJobs)
router.delete('/delete-job/:id',userAuth,deleteJob)
router.get('/get-job/:id',userAuth,getJobById)
router.post('/apply-job/:id',userAuth,applyForJob)
router.get('/my-applications',userAuth,userApplications)
router.get('/accept-application/:id',userAuth,acceptApplication)
router.get('/reject-application/:id',userAuth,rejectApplication)

export default router;