import cloudinary from "../config/cloudinary.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "employer") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can create jobs." });
    }

    const { title, description, company, location, salary, deadline } =
      req.body;

    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      deadline,
      postedBy: req.user.id,
    });

    const savedJob = await newJob.save();
    const populatedJob = await savedJob.populate("postedBy", "username email");
    res
      .status(201)
      .json({ message: "Job created successfully", job: populatedJob });
  } catch (err) {
    res.status(500).json({ message: "Error creating job", error: err.message });
    console.error(err);
  }
};

export const getEmployerCreatedJobs = async (req, res) => {
  try {
    const employerId = req.user.id;
    if (req.user.role !== "employer") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only employers can view their created jobs.",
        });
    }
    const jobs = await Job.find({ postedBy: employerId }).populate(
      "postedBy",
      "username email"
    );
    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this employer." });
    }
    res.status(200).json({ message: "Jobs fetched successfully", jobs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: err.message });
    console.error(err);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "username email")
      .sort({ createdAt: -1 });
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs available." });
    }
    res.status(200).json({ message: "Jobs fetched successfully", jobs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: err.message });
    console.error(err);
  }
};

export const deleteJob = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "employer") {
      return res
        .status(403)
        .json({ message: "Access denied. Only employers can delete jobs." });
    }

    const JobId = req.params.id;
    const job = await Job.findByIdAndDelete(JobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json({ message: "Job deleted successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job", error: err.message });
    console.error(err);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate(
      "postedBy",
      "username email"
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    res.status(200).json({ message: "Job fetched successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Error fetching job", error: err.message });
    console.error(err);
  }
};


export const applyForJob=async(req,res)=>{
    try{
        const jobId=req.params.id;
        const userId=req.user.id;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: 'Job not found'});
        }

        const {applicantName, applicantEmail, applicantPhone, resume, coverLetter} = req.body;
        if(!applicantName || !applicantEmail || !applicantPhone || !resume || !coverLetter){
            return res.status(400).json({message: 'All fields are required'});
        }

        const resumeResponse=await cloudinary.uploader.upload(resume, {
            folder: 'job_applications',
            public_id: `${applicantName}_resume`,
            resource_type: 'raw'
        });
        
        const coverLetterResponse=await cloudinary.uploader.upload(coverLetter, {
            folder: 'job_applications',
            public_id: `${applicantName}_cover_letter`,
            resource_type: 'raw'
        });

        const newApplication = new Application({
            jobId,
            userId,
            applicantName,
            applicantEmail,
            applicantPhone,
            resume: resumeResponse.secure_url,
            coverLetter: coverLetterResponse.secure_url
        });

        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (err) {
        res.status(500).json({ message: 'Error applying for job', error: err.message });
        console.error(err);
    }
}