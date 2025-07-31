import Job from '../models/job.model.js'

export const createJob=async(req,res)=>{
    try{
        const role = req.user.role;
        if(role !== 'admin'){
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