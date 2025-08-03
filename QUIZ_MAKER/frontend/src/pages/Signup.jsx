import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

const Signup = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const {navigate}=useContext(AppContext)



  const handleSubmit=async(e)=>{
    e.preventDefault();
    const userData = { name, email, password };
    console.log("User Data:", userData);

    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, userData, { withCredentials: true });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setemail('');
      setname('');
      setpassword('');
      toast.success(res.data.message);
      navigate('/');
    }catch(err){
      console.error("Error during signup:", err);
      toast.error(err.response ? err.response.data.message : "An error occurred during signup.");
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl overflow-hidden flex w-full max-w-4xl border border-gray-700">
        
        {/* Image section */}
        <div className="w-1/2 hidden md:block relative bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Join QuizMaker</h3>
              <p className="text-sm opacity-90">Start creating amazing quizzes and engage your audience</p>
            </div>
          </div>
        </div>

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
              <h2 className="text-lg font-semibold text-white mb-1">Create an Account</h2>
              <p className="text-gray-400 text-xs">Join thousands of quiz creators</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1 text-xs font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 text-xs font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
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
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="Create password"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Create Account
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;