import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import AppContext from '../context/AppContext'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login') 
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [emailToOtp, setemailToOtp] = useState("")
  const {setuser,setemployer,navigate}=useContext(AppContext)

  const handleLogin=async(e)=>{
    e.preventDefault();
    const formdata={
      email,
      password
    }

    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, formdata,{withCredentials:true});
      localStorage.setItem('token', res.data.token)
      if(res.data.user.role === 'user') {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setuser(res.data.user)
      }
      if(res.data.user.role === 'employer') {
        localStorage.setItem('employer', JSON.stringify(res.data.user))
        setemployer(res.data.user)
      }
      setemail('')
      setpassword('')
      navigate('/')
      toast.success(res.data.message);
    }catch(err){
      console.error("Error during login:", err);
      toast.error(err.response.data.message || "An error occurred during login.");
    }
  }

  const handleResetPassword=async(e)=>{
    e.preventDefault();
    try{
const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/send-otp`, { email: emailToOtp }, { withCredentials: true });
toast.success(res.data.message);
navigate('/reset-password');
setemailToOtp('');
    }catch(err){
      console.error("Error sending OTP:", err);
      toast.error(err.response.data.message || "An error occurred while sending OTP.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      
      {/* Left Image Section */}
      <div className="md:w-1/2 flex items-center justify-center bg-blue-100">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
          alt="Login to job board"
          className="w-4/5 h-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Right Form Section */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <div className="mb-4">
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            Welcome Back
          </h2>

          {/* Tab Navigation */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'login'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('reset')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'reset'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Reset Password
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/reset-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          )}

          {/* Reset Password Form */}
          {activeTab === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Enter your email address and we'll send you an OTP to reset your password.
                </p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                value={emailToOtp}
                  onChange={(e) => setemailToOtp(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
              >
                Send Reset OTP
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  You will be redirected to the reset password page after OTP is sent
                </p>
              </div>
            </form>
          )}

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
