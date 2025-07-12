import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import useStore from '../store/useStore';

const { FiSend, FiMic, FiClock, FiTrendingUp, FiMapPin, FiPhone, FiCalendar } = FiIcons;

const AIAssistant = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { cityName, aiHistory, addAiQuery } = useStore();

  const quickQuestions = [
    {
      id: 1,
      question: "What's the weather like today?",
      icon: FiClock,
      category: 'Weather'
    },
    {
      id: 2,
      question: "Where is the nearest hospital?",
      icon: FiMapPin,
      category: 'Emergency'
    },
    {
      id: 3,
      question: "What events are happening this weekend?",
      icon: FiCalendar,
      category: 'Events'
    },
    {
      id: 4,
      question: "How do I contact city hall?",
      icon: FiPhone,
      category: 'Government'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const mockResponse = {
        answer: `Based on my knowledge of ${cityName}, here's what I found about "${query}". This is a simulated response that would normally come from our AI system that combines local database information with real-time web search.`,
        sources: ['City Database', 'Local News', 'Government Records'],
        confidence: 0.85,
        followUp: ['Tell me more about this', 'What are the hours?', 'How do I get there?']
      };
      
      addAiQuery(query, mockResponse);
      setQuery('');
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickQuestion = (question) => {
    setQuery(question);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ask me anything about {cityName}
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about local businesses, events, weather..."
            className="w-full px-4 py-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <SafeIcon icon={FiMic} className="w-5 h-5" />
            </motion.button>
            <motion.button
              type="submit"
              disabled={!query.trim() || isLoading}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-primary-600 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <SafeIcon icon={FiSend} className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </form>

      {/* Quick Questions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Popular Questions
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {quickQuestions.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleQuickQuestion(item.question)}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center space-x-3 text-left"
            >
              <div className="bg-primary-100 dark:bg-primary-900 rounded-lg w-10 h-10 flex items-center justify-center">
                <SafeIcon icon={item.icon} className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.question}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.category}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat History */}
      {aiHistory.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Recent Conversations
          </h2>
          <div className="space-y-4">
            {aiHistory.slice(-5).reverse().map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-3">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">
                    Q: {item.query}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {item.response.answer}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Confidence: {Math.round(item.response.confidence * 100)}%</span>
                    <span>Sources: {item.response.sources.join(', ')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;