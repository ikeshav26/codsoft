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
  const [resumeFileName, setResumeFileName] = useState("");
  const [coverLetterFileName, setCoverLetterFileName] = useState("");
  const {navigate}=useContext(AppContext);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      if (type === "resume") {
        setResumeBase64(base64);
        setResumeFileName(file.name);
      } else {
        setCoverLetterBase64(base64);
        setCoverLetterFileName(file.name);
      }
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
      setResumeFileName("");
      setCoverLetterFileName("");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Apply for Your Dream Job</h2>
          <p className="text-gray-600 text-lg">
            Take the next step in your career journey
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.636-2.191M3 3l3.553 3.553a2 2 0 0 0 2.828 0L21 21M5 3l14 14" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Job Application</h3>
              <p className="text-gray-600">Please fill in your details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    name="applicantName"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    name="applicantEmail"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    type="tel"
                    name="applicantPhone"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91-XXXXXXXXXX"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.636-2.191M3 3l3.553 3.553a2 2 0 0 0 2.828 0L21 21M5 3l14 14" />
                </svg>
                Required Documents
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Resume/CV *</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFileChange(e, "resume")}
                      required
                    />
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                      resumeFileName ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                    }`}>
                      {resumeFileName ? (
                        <>
                          <svg className="mx-auto h-8 w-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm text-green-700 font-semibold">{resumeFileName}</p>
                          <p className="text-xs text-green-600 mt-1">File uploaded successfully</p>
                        </>
                      ) : (
                        <>
                          <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">Click to upload</span> your resume
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (MAX. 10MB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter *</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="coverLetter"
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFileChange(e, "coverLetter")}
                      required
                    />
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                      coverLetterFileName ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                    }`}>
                      {coverLetterFileName ? (
                        <>
                          <svg className="mx-auto h-8 w-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm text-green-700 font-semibold">{coverLetterFileName}</p>
                          <p className="text-xs text-green-600 mt-1">File uploaded successfully</p>
                        </>
                      ) : (
                        <>
                          <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.636-2.191M3 3l3.553 3.553a2 2 0 0 0 2.828 0L21 21M5 3l14 14" />
                          </svg>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">Click to upload</span> cover letter
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (MAX. 10MB)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Submit Application
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                By submitting this application, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help with your application? 
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold ml-1">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
