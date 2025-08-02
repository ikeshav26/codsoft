import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppContext from '../context/AppContext';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useContext(AppContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          withCredentials: true,
        });

        if (res.data.user.role !== 'user') {
          navigate('/');
          toast.error("Access denied. Only users can view this page.");
          return;
        }

        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(error.response?.data?.message || "Error fetching user info.");
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/my-applications`, {
          withCredentials: true,
        });
        setApplications(res.data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(error.response?.data?.message || "Error fetching applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchApplications();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        {user && (
          <div className="mb-10 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-full mr-6">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.username}!</h1>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {user.email}
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Job Seeker
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.636-2.191M3 3l3.553 3.553a2 2 0 0 0 2.828 0L21 21M5 3l14 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{applications.length}</p>
                  <p className="text-gray-600 text-sm">Total Applications</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {applications.filter(app => app.status === 'accepted').length}
                  </p>
                  <p className="text-gray-600 text-sm">Accepted</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {applications.filter(app => app.status === 'applied').length}
                  </p>
                  <p className="text-gray-600 text-sm">Pending Review</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {applications.filter(app => app.status === 'declined' || app.status === 'rejected').length}
                  </p>
                  <p className="text-gray-600 text-sm">Declined</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Job Applications</h2>
            <p className="text-gray-600">Track the status of your job applications</p>
          </div>
          <button
            onClick={() => navigate('/explore-jobs')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Jobs
          </button>
        </div>

        {/* Applications List */}
        {applications.length > 0 ? (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {app.jobId?.title || 'Job Title Not Available'}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          {app.jobId?.company || 'Company Not Available'}
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        app.status === 'accepted' 
                          ? 'bg-green-100 text-green-800' 
                          : app.status === 'declined' || app.status === 'rejected'
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status === 'rejected' ? 'Declined' : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {app.jobId?.location || 'Location Not Available'}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        {app.jobId?.salary ? `$${app.jobId.salary.toLocaleString()}` : 'Salary Not Available'}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Applied as: {app.applicantName}</span>
                      <span>•</span>
                      <span>Email: {app.applicantEmail}</span>
                      <span>•</span>
                      <span>Phone: {app.applicantPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.636-2.191M3 3l3.553 3.553a2 2 0 0 0 2.828 0L21 21M5 3l14 14" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No applications yet</h3>
            <p className="text-gray-500 mb-6">Start applying for jobs to see your applications here</p>
            <button
              onClick={() => navigate('/explore-jobs')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Available Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;