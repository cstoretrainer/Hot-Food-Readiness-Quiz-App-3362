import React from 'react';
import { motion } from 'framer-motion';

const YesNoToggle = ({ question, selectedAnswer, onAnswerChange }) => {
  return (
    <div className="space-y-6">
      {/* Staff preparedness illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="text-6xl mb-3">👨‍🍳</div>
        <div className="flex justify-center space-x-3 text-2xl opacity-70">
          <span role="img" aria-label="safety gloves">🧤</span>
          <span role="img" aria-label="certificate">📜</span>
          <span role="img" aria-label="food safety">🛡️</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Food Safety Training & Certification</p>
      </motion.div>

      <div className="flex justify-center">
        <div className="bg-gray-100 p-2 rounded-2xl flex">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswerChange(true)}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-2 ${
              selectedAnswer === true
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <span role="img" aria-hidden="true">✅</span>
            <span>Yes</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswerChange(false)}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-2 ${
              selectedAnswer === false
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <span role="img" aria-hidden="true">❌</span>
            <span>No</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default YesNoToggle;