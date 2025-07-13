import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiThermometer, FiUsers, FiTrendingUp, FiPlay } = FiIcons;

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="p-6 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">🔥</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hot Food Readiness Quiz
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Discover if your convenience store is ready to launch or scale a hot food program with our quick 5-question assessment.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-4 mb-8"
      >
        <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
          <SafeIcon icon={FiThermometer} className="text-orange-500 text-xl" />
          <span className="text-gray-700">Food safety & equipment readiness</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
          <SafeIcon icon={FiUsers} className="text-blue-500 text-xl" />
          <span className="text-gray-700">Staff training & experience</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
          <SafeIcon icon={FiTrendingUp} className="text-green-500 text-xl" />
          <span className="text-gray-700">Operational confidence</span>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center space-x-2"
      >
        <SafeIcon icon={FiPlay} className="text-xl" />
        <span>Start Quiz</span>
      </motion.button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Takes about 2 minutes to complete
      </p>
    </div>
  );
};

export default WelcomeScreen;