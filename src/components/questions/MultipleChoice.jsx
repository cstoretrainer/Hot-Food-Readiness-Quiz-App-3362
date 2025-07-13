import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiCalendar, FiTrendingUp, FiStar } = FiIcons;

const MultipleChoice = ({ question, selectedAnswer, onAnswerChange }) => {
  // Icons for experience levels
  const getExperienceIcon = (option) => {
    if (option.includes('Never')) return '🆕';
    if (option.includes('Less than 6')) return '🌱';
    if (option.includes('6-12')) return '📈';
    if (option.includes('1-2')) return '⭐';
    if (option.includes('Over 2')) return '🏆';
    return '📊';
  };

  const getExperienceColor = (option) => {
    if (option.includes('Never')) return 'text-gray-500';
    if (option.includes('Less than 6')) return 'text-green-500';
    if (option.includes('6-12')) return 'text-blue-500';
    if (option.includes('1-2')) return 'text-purple-500';
    if (option.includes('Over 2')) return 'text-yellow-500';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-4">
      {/* Header illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="text-5xl mb-2">🍳</div>
        <div className="flex justify-center space-x-2 text-2xl opacity-60">
          <span>🔥</span>
          <span>🏪</span>
          <span>📅</span>
        </div>
      </motion.div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswerChange(option)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              selectedAnswer === option
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl" role="img" aria-hidden="true">
                {getExperienceIcon(option)}
              </div>
              <div className="flex-1">
                <span className="font-medium">{option}</span>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === option
                  ? 'border-orange-500 bg-orange-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === option && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;