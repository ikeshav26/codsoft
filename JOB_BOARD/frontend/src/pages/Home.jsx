import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                  Find Your Dream <span className="text-yellow-400">Career</span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Connect with top employers, discover amazing opportunities, and take the next step in your professional journey.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link 
                  to="/explore-jobs" 
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  🔍 Explore Jobs
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-800 transition-all duration-200"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex justify-center lg:justify-start space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">10K+</div>
                  <div className="text-sm text-blue-200">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">5K+</div>
                  <div className="text-sm text-blue-200">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">50K+</div>
                  <div className="text-sm text-blue-200">Job Seekers</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                  alt="Professional team collaboration"
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">Live job updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 translate-y-48 -translate-x-48"></div>
      </section>

      {/* Trusted by Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-lg mb-8">Trusted by leading companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-2xl font-bold text-gray-400">TechCorp</div>
            <div className="text-2xl font-bold text-gray-400">InnovateLab</div>
            <div className="text-2xl font-bold text-gray-400">FutureWorks</div>
            <div className="text-2xl font-bold text-gray-400">GlobalTech</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose JobBoard?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most comprehensive platform to connect talented professionals with their dream opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-800 text-center mb-4">Lightning Fast Applications</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Apply to multiple jobs instantly with our one-click application system. No more repetitive form filling.
              </p>
            </div>

            <div className="group p-8 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-800 text-center mb-4">Verified Employers</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Every company on our platform is thoroughly vetted. Work with legitimate, reputable employers only.
              </p>
            </div>

            <div className="group p-8 border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-800 text-center mb-4">Smart Analytics</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Track your applications, get insights on your profile views, and optimize your job search strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get hired in just 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Your Profile</h3>
              <p className="text-gray-600">
                Build a compelling profile that showcases your skills, experience, and career goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Apply to Jobs</h3>
              <p className="text-gray-600">
                Browse thousands of opportunities and apply to positions that match your interests.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Get Hired</h3>
              <p className="text-gray-600">
                Connect with employers, ace your interviews, and land your dream job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from professionals who found their dream jobs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "JobBoard helped me land my dream job at a top tech company. The process was seamless and the support was incredible!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" 
                  alt="Michael Chen" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The quality of job listings is exceptional. I found multiple opportunities that perfectly matched my skills."
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" 
                  alt="Emily Davis" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Emily Davis</h4>
                  <p className="text-gray-600 text-sm">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a freelancer looking to go full-time, JobBoard connected me with amazing companies I never would have found otherwise."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of professionals who have already found their perfect job through JobBoard
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup" 
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🚀 Start Your Journey
            </Link>
            <Link 
              to="/explore-jobs" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-800 transition-all duration-200"
            >
              Browse Jobs
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center items-center space-x-8 text-blue-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free to join
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No spam, ever
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Get hired faster
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home