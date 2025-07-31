import express from 'express';
import { createJob } from '../controller/job.controller.js';
import  userAuth  from '../middlewares/userAuth.js';

const router=express.Router();


router.post('/create-job',userAuth,createJob)


export default router;