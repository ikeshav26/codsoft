import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddQuestionsToQuiz = () => {
  const { id } = useParams() // Quiz ID from URL
  const navigate = useNavigate()
  
  const [quiz, setQuiz] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  
  const [formData, setFormData] = useState({
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: 0
  })

  // Fetch quiz details on component mount
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quiz/${id}`,
          { withCredentials: true }
        )
        setQuiz(response.data.quiz)
      } catch (error) {
        console.error('Error fetching quiz:', error)
        // If quiz not found, redirect to dashboard
        navigate('/dashboard')
      }
    }
    
    if (id) {
      fetchQuiz()
    }
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'correctAnswer' ? parseInt(value) : value
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
    
    if (!formData.questionText.trim()) {
      newErrors.questionText = 'Question text is required'
    }
    
    if (!formData.option1.trim()) {
      newErrors.option1 = 'Option 1 is required'
    }
    
    if (!formData.option2.trim()) {
      newErrors.option2 = 'Option 2 is required'
    }
    
    if (!formData.option3.trim()) {
      newErrors.option3 = 'Option 3 is required'
    }
    
    if (!formData.option4.trim()) {
      newErrors.option4 = 'Option 4 is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' })
    }, 3000)
  }

  const resetForm = () => {
    setFormData({
      questionText: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: 0
    })
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      const requestData = {
        questionText: formData.questionText,
        options: [
          formData.option1,
          formData.option2,
          formData.option3,
          formData.option4
        ],
        correctAnswer: formData.correctAnswer
      }
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/quiz/add-question/${id}`,
        requestData,
        { withCredentials: true }
      )
      
      showToast('Question added successfully! 🎉', 'success')
      resetForm()
      
      // Update quiz data to show updated question count
      if (quiz) {
        setQuiz(prev => ({
          ...prev,
          questions: [...(prev.questions || []), response.data.question]
        }))
      }
      
    } catch (error) {
      console.error('Error adding question:', error)
      if (error.response?.data?.message) {
        showToast(error.response.data.message, 'error')
      } else {
        showToast('Failed to add question. Please try again.', 'error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading quiz details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg shadow-lg transition-all duration-300 ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } text-white`}>
            <div className="flex items-center gap-2">
              <span className="text-sm">{toast.type === 'success' ? '✅' : '❌'}</span>
              <span className="text-xs">{toast.message}</span>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Image/Illustration */}
          <div className="hidden lg:block">
            <div className="relative p-8">
              {/* Main Illustration */}
              <div className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 gap-3 h-full">
                    {[...Array(32)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg w-3 h-3"></div>
                    ))}
                  </div>
                </div>
                
                {/* Central Content */}
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <span className="text-6xl">❓</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Build Engaging Questions</h2>
                  <p className="text-white/90 text-lg leading-relaxed mb-6">
                    Create thoughtful questions that challenge and educate. Every question you add makes your quiz better!
                  </p>
                  
                  {/* Feature Points */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">📝</span>
                      </div>
                      <span className="text-sm">Multiple choice format</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">🎯</span>
                      </div>
                      <span className="text-sm">Clear correct answers</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">🧠</span>
                      </div>
                      <span className="text-sm">Test knowledge effectively</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xl">💡</span>
                </div>
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-lg">✅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            {/* Header for mobile */}
            <div className="text-center mb-6 lg:hidden">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-lg">❓</span>
                </div>
              </div>
              <h1 className="text-xl font-bold text-white mb-1">Add Questions to Quiz</h1>
              <p className="text-gray-400 text-sm mb-1">Quiz: <span className="text-white font-medium">{quiz.title}</span></p>
              <p className="text-gray-500 text-xs">
                Current Questions: <span className="text-blue-400 font-medium">{quiz.questions?.length || 0}</span>
              </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Add Questions</h1>
              <p className="text-gray-400 mb-1">Quiz: <span className="text-white font-medium">{quiz.title}</span></p>
              <p className="text-gray-500 text-sm">
                Questions: <span className="text-blue-400 font-medium">{quiz.questions?.length || 0}</span>
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>📝</span> Create Question
                </h2>
                <p className="text-gray-400 text-xs mt-1">Add a multiple choice question with 4 options</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Question Text */}
                <div>
                  <label htmlFor="questionText" className="block text-xs font-medium text-gray-300 mb-1">
                    Question Text <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="questionText"
                    name="questionText"
                    value={formData.questionText}
                    onChange={handleChange}
                    placeholder="Enter your question here..."
                    rows="2"
                    className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                      errors.questionText 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  {errors.questionText && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.questionText}
                    </p>
                  )}
                </div>

                {/* Options Grid */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Answer Options <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num}>
                        <label htmlFor={`option${num}`} className="block text-xs font-medium text-gray-400 mb-1">
                          Option {num}
                        </label>
                        <input
                          type="text"
                          id={`option${num}`}
                          name={`option${num}`}
                          value={formData[`option${num}`]}
                          onChange={handleChange}
                          placeholder={`Enter option ${num}...`}
                          className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors[`option${num}`] 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          disabled={isLoading}
                        />
                        {errors[`option${num}`] && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <span>⚠️</span> {errors[`option${num}`]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct Answer Dropdown */}
                <div>
                  <label htmlFor="correctAnswer" className="block text-xs font-medium text-gray-300 mb-1">
                    Correct Answer <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="correctAnswer"
                    name="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    disabled={isLoading}
                  >
                    <option value={0}>Option 1: {formData.option1 || 'Enter option 1 first'}</option>
                    <option value={1}>Option 2: {formData.option2 || 'Enter option 2 first'}</option>
                    <option value={2}>Option 3: {formData.option3 || 'Enter option 3 first'}</option>
                    <option value={3}>Option 4: {formData.option4 || 'Enter option 4 first'}</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Select which option is the correct answer</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-1"
                    disabled={isLoading}
                  >
                    <span>🏠</span> Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-1 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <span>➕</span> Add Question
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuestionsToQuiz
