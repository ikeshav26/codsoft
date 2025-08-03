import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import About from './pages/About'
import Contact from './pages/Contact' 
import Quizes from './pages/Quizes'
import Login from './pages/Login'
import Signup from './pages/Signup'     
import Dashboard from './pages/Dashboard'
import { AppContext } from './context/AppContext'

const App = () => {
  const {user,location}=useContext(AppContext)
  return (
    <div className='bg-green-300 text-3xl'>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar/>}
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/quizes' element={<Quizes/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
     </Routes>
    {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer/>}
     <Toaster/>
    </div>
  )
}

export default App
