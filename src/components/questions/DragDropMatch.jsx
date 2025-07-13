import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DragDropMatch = ({ question, selectedAnswer, onAnswerChange }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [matches, setMatches] = useState(selectedAnswer || {});

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (category) => {
    if (draggedItem) {
      const newMatches = { ...matches, [draggedItem]: category };
      setMatches(newMatches);
      onAnswerChange(newMatches);
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getItemsInCategory = (category) => {
    return Object.entries(matches)
      .filter(([_, cat]) => cat === category)
      .map(([item, _]) => item);
  };

  const getUnmatchedItems = () => {
    return question.items.filter(item => !matches[item]);
  };

  const getItemIcon = (item) => {
    if (item.includes('Temperature')) return '🌡️';
    if (item.includes('Customer')) return '🤝';
    if (item.includes('prep')) return '🥘';
    if (item.includes('training')) return '📚';
    return '📋';
  };

  const getCategoryIcon = (category) => {
    if (category === 'Prep') return '🥘';
    if (category === 'Cook') return '🍳';
    if (category === 'Serve') return '🤝';
    return '📋';
  };

  return (
    <div className="space-y-6">
      {/* Operations illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="text-5xl mb-3">🏭</div>
        <div className="flex justify-center space-x-3 text-2xl opacity-70">
          <span role="img" aria-label="preparation">🥘</span>
          <span>➡️</span>
          <span role="img" aria-label="cooking">🍳</span>
          <span>➡️</span>
          <span role="img" aria-label="serving">🤝</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">Operations Workflow</p>
      </motion.div>

      {/* Unmatched Items */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700">Drag items to the correct category:</h3>
        <div className="flex flex-wrap gap-2">
          {getUnmatchedItems().map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg cursor-move hover:bg-blue-200 transition-colors touch-manipulation flex items-center space-x-2"
            >
              <span role="img" aria-hidden="true">{getItemIcon(item)}</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {question.categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onDrop={() => handleDrop(category)}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[80px] hover:border-orange-400 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-2">
              <span role="img" aria-hidden="true" className="text-xl">
                {getCategoryIcon(category)}
              </span>
              <h4 className="font-semibold text-gray-700">{category}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {getItemsInCategory(category).map((item) => (
                <div
                  key={item}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
                >
                  <span role="img" aria-hidden="true">{getItemIcon(item)}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile-friendly alternative */}
      <div className="md:hidden">
        <p className="text-sm text-gray-600 mb-4">
          Tap an item, then tap a category to match:
        </p>
        {getUnmatchedItems().map((item) => (
          <div key={item} className="mb-3">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg mb-2 flex items-center space-x-2">
              <span role="img" aria-hidden="true">{getItemIcon(item)}</span>
              <span>{item}</span>
            </div>
            <div className="flex gap-2">
              {question.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleDrop(category)}
                  onTouchStart={() => setDraggedItem(item)}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors flex items-center space-x-1"
                >
                  <span role="img" aria-hidden="true">{getCategoryIcon(category)}</span>
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropMatch;