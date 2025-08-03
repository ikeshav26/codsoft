import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Home = () => {
  const { user } = useContext(AppContext)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Create Amazing
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Quizzes </span>
                  Effortlessly
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Build interactive quizzes, engage your audience, and track results with our powerful and easy-to-use quiz maker platform.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <>
                    <Link 
                      to="/signup" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                    >
                      Get Started Free
                    </Link>
                    <Link 
                      to="/quizes" 
                      className="border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300 text-center"
                    >
                      Explore Quizzes
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                    >
                      Go to Dashboard
                    </Link>
                    <Link 
                      to="/quizes" 
                      className="border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300 text-center"
                    >
                      Browse Quizzes
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">1000+</div>
                  <div className="text-gray-400">Quizzes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">500+</div>
                  <div className="text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">10k+</div>
                  <div className="text-gray-400">Quiz Attempts</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-700">
                <div className="space-y-6">
                  {/* Mock Quiz Interface */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Sample Quiz</h3>
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Question 1/5</span>
                    </div>
                    <p className="text-gray-300 mb-4">What is the capital of France?</p>
                    <div className="space-y-3">
                      <div className="bg-gray-700 hover:bg-blue-600 transition-colors cursor-pointer p-3 rounded-lg text-gray-300">
                        A) London
                      </div>
                      <div className="bg-blue-600 p-3 rounded-lg text-white">
                        B) Paris ✓
                      </div>
                      <div className="bg-gray-700 hover:bg-blue-600 transition-colors cursor-pointer p-3 rounded-lg text-gray-300">
                        C) Madrid
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">Progress</span>
                      <span className="text-blue-400 text-sm">20%</span>
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
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose QuizMaker?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features to create, share, and analyze quizzes with ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Easy to Create</h3>
              <p className="text-gray-300">
                Build quizzes in minutes with our intuitive interface. Add questions, set answers, and customize settings effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Real-time Results</h3>
              <p className="text-gray-300">
                Track performance and get instant feedback. Monitor quiz attempts and analyze results with detailed insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Share Anywhere</h3>
              <p className="text-gray-300">
                Share your quizzes with anyone, anywhere. Perfect for classrooms, training, or just for fun with friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your First Quiz?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of educators, trainers, and quiz enthusiasts who trust QuizMaker
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Creating Now
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-gray-500 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          ) : (
            <Link 
              to="/create-quiz" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
