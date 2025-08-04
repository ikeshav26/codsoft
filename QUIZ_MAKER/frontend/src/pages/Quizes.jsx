import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const Quizes = () => {
  const [quizes, setQuizes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {setuser,navigate} = useContext(AppContext)

  useEffect(() => {
  const fetchQuizes=async()=>{
    try{
      setIsLoading(true)
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/all-quizes`,{withCredentials:true})
      
    
      if(Array.isArray(res.data)) {
        setQuizes(res.data)
        console.log("Fetched quizes:", res.data)
      } else if(res.data.message === 'Unauthorized access') {
        console.error("Unauthorized access please login first")
        toast.error("Unauthorized access, please login first")
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setuser(null)
        navigate('/')
      } else {
        console.log("Unexpected response format:", res.data)
        setQuizes([])
      }
    }catch(err){
      console.error("Error fetching quizes:", err)
      

      if(err.response?.status === 401 || err.response?.data?.message === 'Unauthorized access') {
        console.error("Unauthorized access please login first")
        toast.error("Unauthorized access, please login first")
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setuser(null)
        navigate('/')
      } else {
        toast.error("Failed to fetch quizzes")
      }
    } finally {
      setIsLoading(false)
    }
  }
  fetchQuizes()
  }, [navigate, setuser])
  const handlePlayQuiz = (quizId) => {
    console.log("Playing quiz:", quizId)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="relative">
              <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-b-purple-600 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold text-white mb-1">Loading Quizzes...</h2>
              <p className="text-sm text-gray-400">Please wait while we fetch available quizzes</p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">Available Quizzes</h1>
              <p className="text-sm text-gray-300">Challenge yourself with these amazing quizzes!</p>
            </div>

            {/* Quizzes Grid */}
            {quizes.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 text-4xl mb-3">📝</div>
                <h3 className="text-lg font-medium text-white mb-1">No Quizzes Available</h3>
                <p className="text-sm text-gray-400">Be the first to create a quiz!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {quizes.map((quiz) => (
                  <div key={quiz._id} className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-700">
                    {/* Quiz Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-3">
                      <h3 className="text-lg font-bold text-white truncate">{quiz.title}</h3>
                    </div>
                    
                    {/* Quiz Card Body */}
                    <div className="p-4">
                      <p className="text-gray-300 mb-3 line-clamp-2 text-sm">{quiz.description}</p>
                      
                      {/* Quiz Stats */}
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Questions:</span>
                          <span className="font-medium text-white">{quiz.questions?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Created:</span>
                      <span className="font-medium text-white text-xs">{formatDate(quiz.createdAt)}</span>
                    </div>
                    {quiz.createdBy && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Creator:</span>
                        <span className="font-medium text-white">{quiz.createdBy.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link to={`/play-quiz/${quiz._id}`} className='flex-1'>
                    <button
                      onClick={() => handlePlayQuiz(quiz._id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Play Quiz
                    </button>
                    </Link>
                    <button className="px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Quiz Difficulty Indicator */}
                {quiz.questions?.length && (
                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Difficulty:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-1.5 h-1.5 rounded-full ${
                              level <= Math.min(Math.ceil(quiz.questions.length / 2), 5)
                                ? 'bg-yellow-400'
                                : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Quizes
