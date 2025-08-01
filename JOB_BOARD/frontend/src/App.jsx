import React, { useContext } from 'react'
import AppContext from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EmployerDashboard from './pages/EmployerDashboard'
import UserDashboard from './pages/UserDashboard'
import Contact from './pages/Contact'
import ResetPassword from './pages/ResetPassword'
import CreateJob from './pages/CreateJob'
import ApplyJob from './pages/ApplyJob'
import ExploreJobs from './pages/ExploreJobs'

const App = () => {
  const {user,navigate,employer,location}=useContext(AppContext);
  return (
    <div className='bg-red-400 text-3xl'>
      {location.pathname.includes('login') || location.pathname.includes('signup') ? null : <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/employer-dashboard" element={employer?<EmployerDashboard/>:<Navigate to='/'/>}/>
        <Route path="/user-dashboard" element={user?<UserDashboard/>:<Navigate to='/'/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/create-job" element={employer?<CreateJob/>:<Navigate to='/'/>}/>
        <Route path="/apply-job" element={user?<ApplyJob/>:<Navigate to='/'/>}/>
        <Route path="/explore-jobs" element={<ExploreJobs/>}/>
      </Routes>
      {location.pathname.includes('login') || location.pathname.includes('signup') ? null : <Footer/>}
    </div>
  )
}

export default App
