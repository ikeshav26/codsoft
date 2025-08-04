import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Home = () => {
  const { user } = useContext(AppContext)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Hero Content */}
            <div className="text-white space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Create Amazing
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Quizzes </span>
                  Effortlessly
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                  Build interactive quizzes, engage your audience, and track results with our powerful and easy-to-use quiz maker platform.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!user ? (
                  <>
                    <Link 
                      to="/signup" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                    >
                      Get Started Free
                    </Link>
                    <Link 
                      to="/quizes" 
                      className="border-2 border-blue-500 text-blue-400 px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-500 hover:text-white transition-all duration-300 text-center"
                    >
                      Explore Quizzes
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                    >
                      Go to Dashboard
                    </Link>
                    <Link 
                      to="/quizes" 
                      className="border-2 border-blue-500 text-blue-400 px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-500 hover:text-white transition-all duration-300 text-center"
                    >
                      Browse Quizzes
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">1000+</div>
                  <div className="text-gray-400 text-sm">Quizzes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">500+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">10k+</div>
                  <div className="text-gray-400 text-sm">Quiz Attempts</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
                <div className="space-y-4">
                  {/* Mock Quiz Interface */}
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold text-sm">Sample Quiz</h3>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">Question 1/5</span>
                    </div>
                    <p className="text-gray-300 mb-3 text-sm">What is the capital of France?</p>
                    <div className="space-y-2">
                      <div className="bg-gray-700 hover:bg-blue-600 transition-colors cursor-pointer p-2 rounded-lg text-gray-300 text-sm">
                        A) London
                      </div>
                      <div className="bg-blue-600 p-2 rounded-lg text-white text-sm">
                        B) Paris ✓
                      </div>
                      <div className="bg-gray-700 hover:bg-blue-600 transition-colors cursor-pointer p-2 rounded-lg text-gray-300 text-sm">
                        C) Madrid
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-xs">Progress</span>
                      <span className="text-blue-400 text-xs">20%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-1/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">
              Why Choose QuizMaker?
            </h2>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Powerful features to create, share, and analyze quizzes with ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Easy to Create</h3>
              <p className="text-gray-300 text-sm">
                Build quizzes in minutes with our intuitive interface. Add questions, set answers, and customize settings effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Real-time Results</h3>
              <p className="text-gray-300 text-sm">
                Track performance and get instant feedback. Monitor quiz attempts and analyze results with detailed insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Share Anywhere</h3>
              <p className="text-gray-300 text-sm">
                Share your quizzes with anyone, anywhere. Perfect for classrooms, training, or just for fun with friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Create Your First Quiz?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Join thousands of educators, trainers, and quiz enthusiasts who trust QuizMaker
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Creating Now
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-gray-500 text-gray-300 px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-700 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          ) : (
            <Link 
              to="/create-quiz" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Your Quiz
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
