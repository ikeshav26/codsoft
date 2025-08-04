import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-auto border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6">
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Brand Section */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              QuizMaker
            </div>
            <div className="text-gray-400 text-xs text-center md:text-left">
              © 2025 QuizMaker. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
              Home
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
              About
            </Link>
            <Link to="/quizes" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
              Quizes
            </Link>
            <Link to="/create-quiz" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
              Create Quiz
            </Link>
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
