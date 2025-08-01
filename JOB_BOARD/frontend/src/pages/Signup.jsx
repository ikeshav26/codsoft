import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AppContext from '../context/AppContext'

const Signup = () => {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [role, setrole] = useState('')

  const {user,employer,navigate,setuser,setemployer}=useContext(AppContext)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const formdata={
      username,
      email,
      password,
      role
    }
    console.log(formdata);

    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, formdata,{withCredentials:true});
      if(role=="user"){
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setuser(res.data.user)
      }
      if(role=="employer"){
        localStorage.setItem('employer', JSON.stringify(res.data.user))
        setemployer(res.data.user)
      }

      localStorage.setItem('token', res.data.token)
      setemail('')
      setpassword('')
      setusername('')
      setrole('')
      navigate('/')
      toast.success(res.data.message);
    }catch(error){
      console.error("Error during signup:", error);
     toast.error(error.response.data.message || "An error occurred during signup.");
    }
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">

      {/* Left Image Section */}
      <div className="md:w-1/2 flex items-center justify-center bg-blue-100">
        <img
          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80"
          alt="Job board signup"
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
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input
              value={username}
              onChange={(e)=>setusername(e.target.value)}
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Role</label>
              <select
                value={role}
                onChange={(e)=>setrole(e.target.value)}
                name="role"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select your role</option>
                <option value="user">Candidate</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
