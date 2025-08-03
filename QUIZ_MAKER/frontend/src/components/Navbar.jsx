import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
 const {user, setuser, navigate}=useContext(AppContext)
 const [isMenuOpen, setIsMenuOpen] = useState(false)
 const userName = user ? user.username || "Guest":"Guest";

 const handleLogout = () => {
   localStorage.removeItem('user');
   setuser(null);
   navigate('/');
   setIsMenuOpen(false);
 }

 const toggleMenu = () => {
   setIsMenuOpen(!isMenuOpen);
 }

 const closeMenu = () => {
   setIsMenuOpen(false);
 }

  return (
    <>
    <nav className="bg-gray-900 shadow-lg px-6 py-3 flex items-center justify-between border-b border-gray-700 sticky top-0 z-50">
      <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        <Link to="/" className="hover:opacity-80 transition-opacity duration-200" onClick={closeMenu}>QuizMaker</Link>
      </div>

      {/* Desktop Navigation */}
      <div className="space-x-8 hidden md:flex">
        <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium relative group">
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
        </Link>
        <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium relative group">
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
        </Link>
        <Link to="/quizes" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium relative group">
          Quizes
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
        </Link>
        {user && (
          <Link to="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium relative group">
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        )}
        <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium relative group">
          Contact
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
        </Link>
      </div>

      {/* Desktop User Actions */}
      <div className="hidden md:flex items-center space-x-3">
        {!user ? (
          <>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium shadow-sm">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 border border-blue-500 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200 text-sm font-medium">
              Sign Up
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-300 text-sm font-medium">Hi, {userName}</span>
            </div>
            <button onClick={handleLogout} className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-300 hover:text-blue-400 focus:outline-none focus:text-blue-400 transition-colors duration-200"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </nav>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-gray-900 border-b border-gray-700 shadow-lg">
        <div className="px-6 py-4 space-y-3">
          {/* Mobile Navigation Links */}
          <Link 
            to="/" 
            className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium py-2"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium py-2"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link 
            to="/quizes" 
            className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium py-2"
            onClick={closeMenu}
          >
            Quizes
          </Link>
          {user && (
            <Link 
              to="/dashboard" 
              className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium py-2"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          )}
          <Link 
            to="/contact" 
            className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium py-2"
            onClick={closeMenu}
          >
            Contact
          </Link>

          {/* Mobile User Actions */}
          <div className="pt-4 border-t border-gray-700">
            {!user ? (
              <div className="space-y-3">
                <Link 
                  to="/login" 
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full text-center px-4 py-2 border border-blue-500 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200 text-sm font-medium"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 py-2">
                  <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-300 text-sm font-medium">Hi, {userName}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Navbar;