import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDownload, FiShare2, FiRefreshCw, FiCheck } = FiIcons;

const ResultScreen = ({ result, onRestart, answers }) => {
  const handleDownload = async () => {
    // Create a simple text summary
    const summary = `
Hot Food Readiness Quiz Results
==============================

Result: ${result.level}
${result.message}

Action Tips:
${result.tips.map(tip => `• ${tip}`).join('\n')}

Quiz Answers:
• Experience with hot food: ${answers[1] || 'Not answered'}
• Staff training completed: ${answers[2] ? 'Yes' : 'No'}
• Confidence level: ${answers[3] || 'Not answered'}/10
• Operations assessment: Completed
• Equipment preference: ${answers[5] || 'Not answered'}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    // Create and download text file
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hot-food-readiness-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `I just completed the Hot Food Readiness Quiz and got: ${result.level}! 🔥 Check your store's readiness at ${window.location.href}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hot Food Readiness Quiz Results',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
        fallbackShare(shareText);
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard!');
    }).catch(() => {
      alert('Unable to copy to clipboard. Please copy the URL manually.');
    });
  };

  return (
    <div className="p-6 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">{result.icon}</div>
        <div className={`inline-block px-6 py-3 rounded-full text-white font-bold text-xl mb-4 ${result.color}`}>
          {result.level}
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          {result.message}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Action Tips:</h3>
        <div className="space-y-3">
          {result.tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <SafeIcon icon={FiCheck} className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="text-lg" />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center space-x-2 bg-green-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition-colors"
          >
            <SafeIcon icon={FiShare2} className="text-lg" />
            <span>Share</span>
          </button>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center space-x-2 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:bg-gray-600 transition-colors"
        >
          <SafeIcon icon={FiRefreshCw} className="text-lg" />
          <span>Take Quiz Again</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ResultScreen;