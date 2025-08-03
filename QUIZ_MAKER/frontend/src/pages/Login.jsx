import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import {AppContext} from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {navigate,setuser} = useContext(AppContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log("Login Data:", userData);

     try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData, { withCredentials: true });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setEmail('');
      setPassword('');
      setuser(res.data.user);
      toast.success(res.data.message);
      navigate('/');
    }catch(err){
      console.error("Error during login:", err);
      toast.error(err.response ? err.response.data.message : "An error occurred during login.");
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl overflow-hidden flex w-full max-w-4xl border border-gray-700">
        
        {/* Form section */}
        <div className="w-full md:w-1/2 p-8 relative">
          {/* Back to Home Link */}
          <Link 
            to="/" 
            className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>

          <div className="mt-8">
            {/* Logo/Brand */}
            <div className="text-center mb-6">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                QuizMaker
              </div>
              <h2 className="text-lg font-semibold text-white mb-1">Welcome Back</h2>
              <p className="text-gray-400 text-xs">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1 text-xs font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 text-xs font-medium">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-3 h-3 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="ml-2 text-xs text-gray-400">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Sign In
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="w-1/2 hidden md:block relative bg-gradient-to-br from-purple-600 to-blue-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Secure Login</h3>
              <p className="text-sm opacity-90">Access your quizzes and continue creating amazing content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;