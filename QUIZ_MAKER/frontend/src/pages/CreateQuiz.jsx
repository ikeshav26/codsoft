import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CreateQuiz = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Quiz title is required'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Quiz description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/quiz/create`,
        formData,
        { withCredentials: true }
      )
      
      if (response.data.quiz) {
        navigate(`/add-question/quiz/${response.data.quiz._id}`)
        toast.success('Quiz created successfully! Now add questions.')
      }
    } catch (error) {
      console.error('Error creating quiz:', error)
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message })
      } else {
        setErrors({ general: 'Failed to create quiz. Please try again.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Image/Illustration */}
          <div className="hidden lg:block">
            <div className="relative p-8">
              {/* Main Illustration */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-6 gap-4 h-full">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="bg-white rounded-full w-2 h-2"></div>
                    ))}
                  </div>
                </div>
                
                {/* Central Content */}
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <span className="text-6xl">📚</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Share Your Knowledge</h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-6">
                    Create engaging quizzes and help others learn. Your expertise can make a difference!
                  </p>
                  
                  {/* Feature Points */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">✨</span>
                      </div>
                      <span className="text-sm">Easy quiz creation</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">🎯</span>
                      </div>
                      <span className="text-sm">Multiple choice questions</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">📊</span>
                      </div>
                      <span className="text-sm">Track performance</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xl">💡</span>
                </div>
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-lg">🚀</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Header for mobile */}
            <div className="text-center mb-6 lg:hidden">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
              <h1 className="text-xl font-bold text-white mb-1">Create Your Quiz ✨</h1>
              <p className="text-gray-400 text-sm">Ready to share your knowledge?</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Create Your Quiz</h1>
              <p className="text-gray-400">Let's build something amazing together!</p>
            </div>

            {/* Form Card */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>🎯</span> Quiz Details
                </h2>
                <p className="text-gray-400 text-xs mt-1">Give your quiz a catchy title and description</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* General Error */}
                {errors.general && (
                  <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-red-400 text-sm">❌</span>
                      <p className="text-red-300 text-xs">{errors.general}</p>
                    </div>
                  </div>
                )}

                {/* Quiz Title */}
                <div>
                  <label htmlFor="title" className="block text-xs font-medium text-gray-300 mb-1">
                    Quiz Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., JavaScript Basics Quiz"
                    className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.title 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.title}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Make it catchy! 🎪</p>
                </div>

                {/* Quiz Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-medium text-gray-300 mb-1">
                    Quiz Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us what your quiz is about..."
                    rows="3"
                    className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                      errors.description 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Help others understand what they'll learn 📚</p>
                </div>

                {/* Character Counters */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formData.title.length} chars</span>
                  <span>{formData.description.length} chars</span>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-1"
                    disabled={isLoading}
                  >
                    <span>↩️</span> Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-1 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <span>🚀</span> Create & Add Questions
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Info Card */}
              <div className="p-3 border-t border-gray-700 bg-gray-750">
                <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 text-sm">💡</span>
                    <div>
                      <h3 className="text-blue-300 font-medium text-xs mb-1">What's next?</h3>
                      <p className="text-blue-200/80 text-xs leading-relaxed">
                        After creating your quiz, you'll add questions with multiple choice answers. 
                        Make it fun and engaging! 🎮
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQuiz
