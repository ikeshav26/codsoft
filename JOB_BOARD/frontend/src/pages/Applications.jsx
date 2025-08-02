import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Applications = () => {
  const { id } = useParams(); 
  const [applications, setApplications] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);


 
  useEffect(() => {
   
    const fetchApplications = async () => {

      try{
        const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/applications/${id}`, { withCredentials: true });
        setApplications(res.data.applications);
        console.log(res.data.applications);
      }catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(error.response?.data?.message || "An error occurred while fetching applications.");
      }
      
      
    };

    fetchApplications();
  }, [id, refreshTrigger]);

  const handleApplicationAccept=async(appid)=>{
    try{
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/accept-application/${appid}`, { withCredentials: true });
      toast.success(res.data.message);
      setRefreshTrigger(prev => prev + 1); 
    }catch(error) {
      console.error("Error accepting application:", error);
      toast.error(error.response?.data?.message || "An error occurred while accepting the application.");
    }
  }

  const handleApplicationReject=async(appid)=>{
    try{
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/reject-application/${appid}`, { withCredentials: true });
      toast.success(res.data.message);
      setRefreshTrigger(prev => prev + 1); 
    }catch(error) {
      console.error("Error rejecting application:", error);
      toast.error(error.response?.data?.message || "An error occurred while rejecting the application.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
                {applications.length > 0 && applications[0].jobId && (
                  <div className="mt-2">
                    <h2 className="text-xl font-semibold text-blue-600">{applications[0].jobId.title}</h2>
                    <p className="text-gray-600">{applications[0].jobId.company} • {applications[0].jobId.location}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
                <p className="text-sm text-blue-700">Total Applications</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'accepted').length}
                </p>
                <p className="text-sm text-green-700">Accepted</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-red-600">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
                <p className="text-sm text-red-700">Declined</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'applied').length}
                </p>
                <p className="text-sm text-yellow-700">Pending Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No applications yet</h3>
            <p className="text-gray-500">Applications will appear here when candidates apply for this position</p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                {/* Application Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center mb-4 lg:mb-0">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{app.applicantName}</h3>
                      <p className="text-gray-600">{app.applicantEmail}</p>
                      <p className="text-sm text-gray-500">{app.applicantPhone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      app.status === 'accepted' 
                        ? 'bg-green-100 text-green-800' 
                        : app.status === 'declined' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </div>
                    <p className="text-sm text-gray-500">
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Application Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {app.applicantName}</p>
                      <p><span className="font-medium">Email:</span> {app.applicantEmail}</p>
                      <p><span className="font-medium">Phone:</span> {app.applicantPhone}</p>
                      <p><span className="font-medium">User ID:</span> {app.userId.username}</p>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.636-2.191M3 3l3.553 3.553a2 2 0 0 0 2.828 0L21 21M5 3l14 14" />
                      </svg>
                      Documents
                    </h4>
                    <div className="space-y-3">
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <svg className="h-4 w-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-600">View Resume</span>
                      </a>
                      <a
                        href={app.coverLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <svg className="h-4 w-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.636-2.191M3 3l3.553 3.553a2 2 0 0 0 2.828 0L21 21M5 3l14 14" />
                        </svg>
                        <span className="text-sm font-medium text-blue-600">View Cover Letter</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    disabled={app.status==="accepted"}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    onClick={() => handleApplicationAccept(app._id)}
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accept Application
                  </button>
                  <button
                  disabled={app.status==="rejected"}
                  onClick={() => handleApplicationReject(app._id)}
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Decline Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;