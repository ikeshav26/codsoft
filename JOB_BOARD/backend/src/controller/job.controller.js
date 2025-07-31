import Job from '../models/job.model.js'

export const createJob=async(req,res)=>{
    try{
        const role = req.user.role;
        if(role !== 'employer'){
            return res.status(403).json({ message: 'Access denied. Only admins can create jobs.' });
        }

        const { title, description, company, location, salary, deadline } = req.body;

        const newJob = new Job({
            title,
            description,
            company,
            location,
            salary,
            deadline,
            postedBy: req.user.id
        });

        const savedJob = await newJob.save();
        const populatedJob = await savedJob.populate('postedBy', 'username email');
        res.status(201).json({ message: 'Job created successfully', job: populatedJob });
    }catch(err){
        res.status(500).json({ message: 'Error creating job', error: err.message });
        console.error(err);
    }
}


export const getEmployerCreatedJobs=async(req,res)=>{
    try{
        const employerId = req.user.id;
        if(req.user.role !== 'employer'){
            return res.status(403).json({ message: 'Access denied. Only employers can view their created jobs.' });
        }
        const jobs = await Job.find({ postedBy: employerId }).populate('postedBy', 'username email');
        if(jobs.length === 0){
            return res.status(404).json({ message: 'No jobs found for this employer.' });
        }
        res.status(200).json({ message: 'Jobs fetched successfully', jobs });
    }catch(err){
        res.status(500).json({ message: 'Error fetching jobs', error: err.message });
        console.error(err);
    }
}


export const getAllJobs=async(req,res)=>{
    try{
        const jobs=await Job.find().populate('postedBy', 'username email').sort({ createdAt: -1 });
        if(jobs.length === 0){
            return res.status(404).json({ message: 'No jobs available.' });
        }
        res.status(200).json({ message: 'Jobs fetched successfully', jobs });
    }catch(err){
        res.status(500).json({ message: 'Error fetching jobs', error: err.message });
        console.error(err);
    }
}