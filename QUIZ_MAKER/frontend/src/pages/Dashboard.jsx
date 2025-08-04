import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {
  const { user } = useContext(AppContext)
  const [myCreatedQuizes, setmyCreatedQuizes] = useState([])
  const [myPlayedQuizes, setmyPlayedQuizes] = useState([])

  useEffect(() => {
    const fetchMyCreatedQuizes=async()=>{
      try{
        const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/my-quizes`, {withCredentials: true})
        setmyCreatedQuizes(res.data.quizes);
        console.log("Fetched created quizes:", res.data.quizes);
      }catch(err){
        console.error("Error fetching created quizes:", err)
      }
    }

    const fetchMyPlayedQuizes=async()=>{
      try{
        const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/my-played/quizes/scores`, {withCredentials: true})
        setmyPlayedQuizes(res.data.scores);
        console.log("Fetched played quizes:", res.data.scores);
      }catch(err){
        console.error("Error fetching played quizes:", err)
      }
    }
    fetchMyCreatedQuizes();
    fetchMyPlayedQuizes();
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getScoreEmoji = (score, total = 3) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return '🎉';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '👏';
    if (percentage >= 60) return '👍';
    if (percentage >= 40) return '💪';
    return '🎯';
  }

  const getEncouragingMessage = (score, total = 3) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'Outstanding! You\'re crushing it! 🔥';
    if (percentage >= 80) return 'Excellent work! Keep it up! ⭐';
    if (percentage >= 70) return 'Great job! You\'re doing well! 👏';
    if (percentage >= 60) return 'Good effort! You\'re on the right track! 📈';
    if (percentage >= 40) return 'Nice try! Every attempt makes you stronger! 💪';
    return 'Keep practicing! You\'ve got this! 🎯';
  }

  const getScoreColor = (score, total = 3) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    if (percentage >= 40) return 'text-orange-400';
    return 'text-red-400';
  }

  const getScoreBadge = (score, total = 3) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 60) return 'bg-yellow-600';
    if (percentage >= 40) return 'bg-orange-600';
    return 'bg-red-600';
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || 'Quiz Master'}! 👋</h1>
              <p className="text-gray-400">Ready to challenge your mind? Let's see how you're doing on your quiz journey!</p>
            </div>
            
            {/* User Profile Card */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 min-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{user?.name || 'User'}</h3>
                  <p className="text-gray-400 text-sm">{user?.email || 'user@example.com'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Active</span>
                    <span className="text-xs text-gray-400">Member since 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Your Creations ✨</p>
                <p className="text-2xl font-bold text-white">{myCreatedQuizes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Quiz Adventures 🎯</p>
                <p className="text-2xl font-bold text-white">{myPlayedQuizes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Your Progress 📊</p>
                <p className="text-2xl font-bold text-white">
                  {myPlayedQuizes.length > 0 
                    ? Math.round((myPlayedQuizes.reduce((sum, quiz) => sum + quiz.score, 0) / myPlayedQuizes.length) * 100) / 100
                    : 0
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Personal Best 🏆</p>
                <p className="text-2xl font-bold text-white">
                  {myPlayedQuizes.length > 0 
                    ? Math.max(...myPlayedQuizes.map(quiz => quiz.score))
                    : 0
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Created Quizzes */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Your Quiz Collection 📚</h2>
                <Link
                  to="/create-quiz"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <span>✨</span> Create New Quiz
                </Link>
              </div>
            </div>
            <div className="p-6">
              {myCreatedQuizes.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-500 text-5xl mb-4">🎨</div>
                  <h3 className="text-lg font-medium text-white mb-2">Your Creative Journey Starts Here!</h3>
                  <p className="text-gray-400 text-sm mb-4">You haven't created any quizzes yet. Why not share your knowledge with the world?</p>
                  <Link
                    to="/create-quiz"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <span>🚀</span> Start Creating
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myCreatedQuizes.map((quiz) => (
                    <div key={quiz._id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all duration-200 hover:shadow-lg border-l-4 border-blue-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-medium">{quiz.title}</h3>
                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Your Creation</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{quiz.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <span>❓</span> {quiz.questions?.length || 0} Questions
                            </span>
                            <span className="flex items-center gap-1">
                              <span>📅</span> {formatDate(quiz.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Link
                            to={`/add-questions-to-quiz/${quiz._id}`}
                            className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 transition-colors duration-200 flex items-center gap-1"
                          >
                            <span>➕</span> Add Questions
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* My Quiz Attempts */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Your Quiz Journey 🎯</h2>
                <Link
                  to="/quizes"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <span>🎮</span> Explore Quizzes
                </Link>
              </div>
            </div>
            <div className="p-6">
              {myPlayedQuizes.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-500 text-5xl mb-4">�</div>
                  <h3 className="text-lg font-medium text-white mb-2">Your Adventure Awaits!</h3>
                  <p className="text-gray-400 text-sm mb-4">Ready to test your knowledge? Take your first quiz and start your learning journey!</p>
                  <Link
                    to="/quizes"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <span>🚀</span> Start Your Journey
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myPlayedQuizes.map((attempt) => (
                    <div key={attempt._id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all duration-200 hover:shadow-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-medium">{attempt.quizId?.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getScoreBadge(attempt.score)} flex items-center gap-1`}>
                              {getScoreEmoji(attempt.score)} {attempt.score}/3
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{attempt.quizId?.description}</p>
                          <div className="bg-gray-800 rounded-lg p-3 mb-3">
                            <p className="text-xs text-gray-300 mb-1">{getEncouragingMessage(attempt.score)}</p>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className={`${getScoreColor(attempt.score)} flex items-center gap-1`}>
                              <span>📊</span> {Math.round((attempt.score / 3) * 100)}% Score
                            </span>
                            <span className="flex items-center gap-1">
                              <span>⏰</span> {formatDate(attempt.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Link
                            to={`/play-quiz/${attempt.quizId?._id}`}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
                          >
                            <span>🔄</span> Try Again
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
