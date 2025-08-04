import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

const PlayQuiz = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
  const fetchQuiz=async()=>{
    try{
      if (!id) {
        console.error("No quiz ID provided");
        return;
      }
      
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/${id}`, { withCredentials: true });
      console.log("Fetched quiz:", res.data);
      setQuiz(res.data.quiz);
    }catch(err){
      console.error("Error fetching quiz:", err);
      toast.error("Failed to load quiz");
    }
  }
  fetchQuiz()
  }, [id])

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    let totalQuestions = quiz.questions.length;
    let answeredQuestions = 0;
    
    quiz.questions.forEach(question => {
      if (selectedAnswers[question._id] !== undefined) {
        answeredQuestions++;
        if (selectedAnswers[question._id] === question.correctAnswer) {
          score++;
        }
      }
    });
    
    return {
      score,
      totalQuestions,
      answeredQuestions,
      percentage: Math.round((score / totalQuestions) * 100)
    };
  };

  const handleSubmitQuiz = async () => {
    // Check if all questions are answered
    const unansweredQuestions = quiz.questions.filter(
      question => selectedAnswers[question._id] === undefined
    );

    if (unansweredQuestions.length > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredQuestions.length} unanswered question(s). Do you want to submit anyway?`
      );
      if (!confirmSubmit) {
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const scoreData = calculateScore();
      
     
      console.log("Score calculation:", {
        selectedAnswers,
        questions: quiz.questions.map(q => ({
          id: q._id,
          correctAnswer: q.correctAnswer,
          userAnswer: selectedAnswers[q._id]
        })),
        finalScore: scoreData
      });

      console.log(scoreData.score, scoreData.totalQuestions, scoreData.answeredQuestions);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/quiz/submit-quiz/${id}`,
        { 
          score: scoreData.score,
          totalQuestions: scoreData.totalQuestions,
          answeredQuestions: scoreData.answeredQuestions
        },
        { withCredentials: true }
      );
      
      console.log("Quiz submission response:", res.data);
      
     
      toast.success(
        `Quiz submitted successfully! Score: ${scoreData.score}/${scoreData.totalQuestions} (${scoreData.percentage}%)`
      );
      
    
      setTimeout(() => {
        navigate('/quizes');
      }, 2000);
      
    } catch (err) {
      console.error("Error submitting quiz:", err);
      toast.error("Failed to submit quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-900 py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center border border-gray-700">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-white mb-2">{quiz.title}</h1>
              <p className="text-gray-300 text-sm mb-4">{quiz.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-blue-400 text-lg font-bold">{quiz.questions.length}</div>
                <div className="text-gray-300 text-xs">Questions</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-green-400 text-lg font-bold">No Time Limit</div>
                <div className="text-gray-300 text-xs">Duration</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-purple-400 text-sm font-bold">Multiple Choice</div>
                <div className="text-gray-300 text-xs">Format</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Instructions:</h3>
              <ul className="text-gray-300 text-left text-sm max-w-md mx-auto space-y-1">
                <li>• Each question has 4 options</li>
                <li>• Select the best answer for each question</li>
                <li>• You can navigate between questions</li>
                <li>• No time limit - take your time</li>
                <li>• Submit when you're ready</li>
              </ul>
            </div>

            <button
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const scoreData = calculateScore();
  const answeredQuestions = scoreData.answeredQuestions;

  return (
    <div className="min-h-screen bg-gray-900 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Progress */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-4 mb-4 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-lg font-bold text-white">{quiz.title}</h1>
            <div className="flex items-center gap-3">
              <div className="text-gray-300 text-sm">
                {currentQuestionIndex + 1} / {quiz.questions.length}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-4 border border-gray-700">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                Question {currentQuestionIndex + 1}
              </span>
              {selectedAnswers[currentQuestion._id] !== undefined && (
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Answered
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-white mb-4">
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion._id, index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion._id] === index
                    ? 'border-blue-500 bg-blue-600/20 text-white'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion._id] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion._id] === index && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-sm">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation and Submit */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600'
                }`}
              >
                Previous
              </button>
              
              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-all duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              )}
            </div>

            <div className="text-gray-300 text-xs">
              Answered: {answeredQuestions} / {quiz.questions.length}
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-4 bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700">
          <h3 className="text-white font-medium text-sm mb-3">Question Navigation</h3>
          <div className="grid grid-cols-10 gap-1.5">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-lg font-medium text-xs transition-all duration-200 ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[quiz.questions[index]._id] !== undefined
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayQuiz
