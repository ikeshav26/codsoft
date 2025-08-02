import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import AppContext from "../context/AppContext";

const ApplyJob = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [resumeBase64, setResumeBase64] = useState("");
  const [coverLetterBase64, setCoverLetterBase64] = useState("");
  const {navigate}=useContext(AppContext);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      if (type === "resume") setResumeBase64(base64);
      else setCoverLetterBase64(base64);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const jobId = window.location.pathname.split("/")[2];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      applicantName: name,
      applicantEmail: email,
      applicantPhone: phone,
      resume: resumeBase64,
      coverLetter: coverLetterBase64,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/apply-job/${jobId}`,
        applicationData,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setname("");
      setemail("");
      setphone("");
      setResumeBase64("");
      setCoverLetterBase64("");
      e.target.reset();
      navigate('/explore-jobs');
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while submitting the application."
      );
    }
  };
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Apply for Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            name="applicantName"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            name="applicantEmail"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            type="tel"
            name="applicantPhone"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            placeholder="+91-XXXXXXXXXX"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="w-full"
            onChange={(e) => handleFileChange(e, "resume")}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Cover Letter</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="w-full"
            onChange={(e) => handleFileChange(e, "coverLetter")}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
