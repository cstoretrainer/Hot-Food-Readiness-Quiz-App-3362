import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import ProgressBar from './components/ProgressBar';
import { questions } from './data/questions';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const handleStartQuiz = () => {
    setCurrentScreen('quiz');
    setCurrentQuestion(0);
  };

  const handleAnswerSubmit = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const result = calculateResult(newAnswers);
      setQuizResult(result);
      setCurrentScreen('result');
    }
  };

  const calculateResult = (answers) => {
    let score = 0;
    let maxScore = 0;

    // Question 1: Multiple choice (0-3 points)
    const q1Answer = answers[1];
    maxScore += 3;
    if (q1Answer === 'Over 2 years') score += 3;
    else if (q1Answer === '1-2 years') score += 2;
    else if (q1Answer === '6-12 months') score += 1;

    // Question 2: Yes/No (0-2 points)
    const q2Answer = answers[2];
    maxScore += 2;
    if (q2Answer === true) score += 2;

    // Question 3: Confidence slider (0-2 points)
    const q3Answer = answers[3];
    maxScore += 2;
    if (q3Answer >= 8) score += 2;
    else if (q3Answer >= 6) score += 1;

    // Question 4: Drag and drop (0-3 points)
    const q4Answer = answers[4];
    maxScore += 3;
    if (q4Answer) {
      let correctMatches = 0;
      const correctAnswers = {
        'Temperature monitoring': 'Cook',
        'Customer service': 'Serve',
        'Ingredient prep': 'Prep',
        'Food safety training': 'Cook'
      };
      
      Object.entries(q4Answer).forEach(([item, category]) => {
        if (correctAnswers[item] === category) correctMatches++;
      });
      score += Math.round((correctMatches / 4) * 3);
    }

    // Question 5: Image ranking (0-2 points)
    const q5Answer = answers[5];
    maxScore += 2;
    if (q5Answer === 'Heated display case') score += 2;
    else if (q5Answer === 'Warming trays') score += 1;

    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) {
      return {
        level: 'Ready to Launch',
        color: 'bg-green-500',
        icon: '🚀',
        message: 'Congratulations! Your store is ready to launch a successful hot food program.',
        tips: [
          'Implement daily temperature logs',
          'Create customer feedback system',
          'Plan grand opening promotion'
        ]
      };
    } else if (percentage >= 60) {
      return {
        level: 'Almost Ready',
        color: 'bg-yellow-500',
        icon: '⚡',
        message: 'You\'re close! A few improvements will get you ready to launch.',
        tips: [
          'Enhance staff training programs',
          'Upgrade equipment as needed',
          'Develop food safety protocols'
        ]
      };
    } else {
      return {
        level: 'Not Yet Ready',
        color: 'bg-red-500',
        icon: '🔧',
        message: 'Focus on building your foundation before launching hot food services.',
        tips: [
          'Invest in proper equipment',
          'Complete comprehensive staff training',
          'Establish food safety procedures'
        ]
      };
    }
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setCurrentQuestion(0);
    setAnswers({});
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg">
        {currentScreen === 'quiz' && (
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
        )}
        
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WelcomeScreen onStart={handleStartQuiz} />
            </motion.div>
          )}

          {currentScreen === 'quiz' && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizScreen
                question={questions[currentQuestion]}
                onAnswer={handleAnswerSubmit}
                currentAnswer={answers[questions[currentQuestion].id]}
              />
            </motion.div>
          )}

          {currentScreen === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ResultScreen
                result={quizResult}
                onRestart={handleRestart}
                answers={answers}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;