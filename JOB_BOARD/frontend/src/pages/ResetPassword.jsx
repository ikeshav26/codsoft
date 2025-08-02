import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const ResetPassword = () => {
  const [email, setemail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const {navigate}=useContext(AppContext)

  const submitHandler=async(e)=>{
    e.preventDefault();
    const formdata={
      oldEmail: email,
      newPassword,
      otp
    }
    console.log("Reset Password Data:", formdata);

    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify-otp`, formdata, { withCredentials: true });
      toast.success(res.data.message);
      setemail('');
      setNewPassword('');
      setOtp('');
      navigate('/login')
    }catch(err){
      console.error("Error during password reset:", err);
      toast.error(err.response.data.message );
    }
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4 overflow-hidden">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Image */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-8">
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80" 
              alt="Reset Password Security" 
              className="w-80 h-80 rounded-2xl object-cover shadow-lg mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Secure Password Reset</h3>
            <p className="text-gray-600 text-sm">
              Your account security is our priority. Follow the steps to safely reset your password.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8">
          {/* Back Link */}
          <div className="mb-4">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              ← Back to Login
            </Link>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Your Password</h2>
            <p className="text-gray-600 text-sm">
              Enter your email, new password, and the OTP sent to your email address.
            </p>
          </div>
          
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
              value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password" 
                placeholder="Enter your new password" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OTP Verification</label>
              <input 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text" 
                placeholder="Enter 6-digit OTP" 
                maxLength="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-lg font-mono tracking-widest"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                OTP sent to your email address
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Back to Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;