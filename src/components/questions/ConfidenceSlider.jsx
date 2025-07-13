import React from 'react';
import { motion } from 'framer-motion';

const ConfidenceSlider = ({ question, selectedAnswer, onAnswerChange }) => {
  const value = selectedAnswer || 5;

  const getConfidenceLabel = (val) => {
    if (val <= 3) return 'Low Confidence';
    if (val <= 6) return 'Moderate Confidence';
    if (val <= 8) return 'High Confidence';
    return 'Very High Confidence';
  };

  const getConfidenceColor = (val) => {
    if (val <= 3) return 'text-red-500';
    if (val <= 6) return 'text-yellow-500';
    if (val <= 8) return 'text-blue-500';
    return 'text-green-500';
  };

  const getConfidenceEmoji = (val) => {
    if (val <= 2) return '😟';
    if (val <= 4) return '😐';
    if (val <= 6) return '🙂';
    if (val <= 8) return '😊';
    return '😁';
  };

  const getAllEmojis = () => ['😟', '😐', '🙂', '😊', '😁'];

  return (
    <div className="space-y-6">
      {/* Confidence illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="text-5xl mb-3">🌡️</div>
        <div className="flex justify-center space-x-2 text-2xl opacity-70">
          <span role="img" aria-label="thermometer">🌡️</span>
          <span role="img" aria-label="safety">🛡️</span>
          <span role="img" aria-label="storage">📦</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Food Temperature, Storage & Safety</p>
      </motion.div>

      {/* Emoji scale */}
      <div className="flex justify-center space-x-2 mb-4">
        {getAllEmojis().map((emoji, index) => {
          const emojiValue = (index + 1) * 2;
          const isActive = Math.abs(value - emojiValue) <= 1;
          return (
            <motion.div
              key={index}
              animate={{ 
                scale: isActive ? 1.2 : 0.8,
                opacity: isActive ? 1 : 0.4
              }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
              role="img"
              aria-hidden="true"
            >
              {emoji}
            </motion.div>
          );
        })}
      </div>

      <div className="text-center">
        <motion.div
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-6xl font-bold text-orange-500 mb-2"
        >
          {value}
        </motion.div>
        <p className={`text-lg font-semibold ${getConfidenceColor(value)}`}>
          {getConfidenceLabel(value)}
        </p>
      </div>

      <div className="px-4">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onAnswerChange(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${(value - 1) * 11.11}%, #e5e7eb ${(value - 1) * 11.11}%, #e5e7eb 100%)`
          }}
          aria-label={`Confidence level: ${value} out of 10`}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceSlider;