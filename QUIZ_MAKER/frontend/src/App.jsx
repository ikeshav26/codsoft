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
import CreateQuiz from './pages/CreateQuiz'
import { Navigate } from 'react-router-dom'
import PlayQuiz from './pages/PlayQuiz'

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
      <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
      <Route path='/signup' element={!user?<Signup/>:<Navigate to='/'/>}/>
      <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to='/'/>}/>
      <Route path='/create-quiz' element={user ? <CreateQuiz/> : <Navigate to='/'/>}/>
      <Route path='/play-quiz/:id' element={<PlayQuiz/> }/>
     </Routes>
    {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer/>}
     <Toaster
       position="top-center"
       toastOptions={{
         duration: 3000,
         style: {
           background: '#374151',
           color: '#ffffff',
           fontSize: '14px',
           padding: '12px 16px',
           borderRadius: '8px',
           maxWidth: '400px',
           border: '1px solid #4B5563'
         },
         success: {
           style: {
             background: '#065F46',
             color: '#ffffff',
             border: '1px solid #059669'
           },
           iconTheme: {
             primary: '#10B981',
             secondary: '#ffffff'
           }
         },
         error: {
           style: {
             background: '#7F1D1D',
             color: '#ffffff',
             border: '1px solid #DC2626'
           },
           iconTheme: {
             primary: '#EF4444',
             secondary: '#ffffff'
           }
         }
       }}
     />
    </div>
  )
}

export default App
