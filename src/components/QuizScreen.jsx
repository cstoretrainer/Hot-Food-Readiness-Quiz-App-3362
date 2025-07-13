import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MultipleChoice from './questions/MultipleChoice';
import YesNoToggle from './questions/YesNoToggle';
import ConfidenceSlider from './questions/ConfidenceSlider';
import DragDropMatch from './questions/DragDropMatch';
import ImageSelect from './questions/ImageSelect';

const QuizScreen = ({ question, onAnswer, currentAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(currentAnswer || null);

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null && selectedAnswer !== undefined) {
      onAnswer(question.id, selectedAnswer);
    }
  };

  const isAnswerValid = () => {
    if (question.type === 'drag-drop') {
      return selectedAnswer && Object.keys(selectedAnswer).length === question.items.length;
    }
    return selectedAnswer !== null && selectedAnswer !== undefined;
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <MultipleChoice
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'yes-no':
        return (
          <YesNoToggle
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'slider':
        return (
          <ConfidenceSlider
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'drag-drop':
        return (
          <DragDropMatch
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 'image-select':
        return (
          <ImageSelect
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerChange={handleAnswerChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {question.title}
          </h2>
          <p className="text-gray-600">
            {question.description}
          </p>
        </div>

        {renderQuestion()}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        whileHover={{ scale: isAnswerValid() ? 1.02 : 1 }}
        whileTap={{ scale: isAnswerValid() ? 0.98 : 1 }}
        onClick={handleSubmit}
        disabled={!isAnswerValid()}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 ${
          isAnswerValid()
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {question.id === 5 ? 'See Results' : 'Next Question'}
      </motion.button>
    </div>
  );
};

export default QuizScreen;