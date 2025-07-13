import React from 'react';
import { motion } from 'framer-motion';

const ImageSelect = ({ question, selectedAnswer, onAnswerChange }) => {
  return (
    <div className="space-y-6">
      {/* Equipment priorities illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="text-5xl mb-3">⚙️</div>
        <div className="flex justify-center space-x-2 text-2xl opacity-70">
          <span role="img" aria-label="equipment">🏪</span>
          <span role="img" aria-label="cooking">🍳</span>
          <span role="img" aria-label="kitchen">👨‍🍳</span>
          <span role="img" aria-label="microwave">📱</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Equipment Priority Selection</p>
      </motion.div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswerChange(option.name)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedAnswer === option.name
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl" role="img" aria-hidden="true">
                {option.emoji}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">{option.name}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === option.name
                  ? 'border-orange-500 bg-orange-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === option.name && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Equipment comparison visual */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 rounded-lg p-4 mt-6"
      >
        <div className="grid grid-cols-2 gap-4 text-center text-xs text-gray-600">
          <div className="space-y-1">
            <div className="text-lg">🔥</div>
            <span>Heat Level</span>
          </div>
          <div className="space-y-1">
            <div className="text-lg">💰</div>
            <span>Investment</span>
          </div>
          <div className="space-y-1">
            <div className="text-lg">⏱️</div>
            <span>Setup Time</span>
          </div>
          <div className="space-y-1">
            <div className="text-lg">📈</div>
            <span>Capacity</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageSelect;