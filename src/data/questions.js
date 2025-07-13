export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    title: 'Hot Food Experience',
    description: 'How long has your store been serving hot food items?',
    options: [
      'Never - this would be our first time',
      'Less than 6 months',
      '6-12 months',
      '1-2 years',
      'Over 2 years'
    ]
  },
  {
    id: 2,
    type: 'yes-no',
    title: 'Staff Training',
    description: 'Has your staff completed food safety training and certification?',
  },
  {
    id: 3,
    type: 'slider',
    title: 'Operational Confidence',
    description: 'On a scale of 1-10, how confident are you in managing food temperature, storage, and safety protocols?',
  },
  {
    id: 4,
    type: 'drag-drop',
    title: 'Operations Matching',
    description: 'Match each activity to the correct operational phase:',
    items: [
      'Temperature monitoring',
      'Customer service',
      'Ingredient prep',
      'Food safety training'
    ],
    categories: ['Prep', 'Cook', 'Serve']
  },
  {
    id: 5,
    type: 'image-select',
    title: 'Equipment Priority',
    description: 'Which equipment would be most important for your hot food program?',
    options: [
      {
        name: 'Heated display case',
        emoji: '🏪',
        description: 'Professional warming display for ready-to-eat items'
      },
      {
        name: 'Warming trays',
        emoji: '🍳',
        description: 'Basic warming equipment for simple items'
      },
      {
        name: 'Full kitchen setup',
        emoji: '👨‍🍳',
        description: 'Complete cooking and preparation station'
      },
      {
        name: 'Microwave station',
        emoji: '📱',
        description: 'Simple reheating for pre-made items'
      }
    ]
  }
];