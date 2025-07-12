import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import useStore from '../store/useStore';

const { FiMessageCircle, FiNewspaper, FiMapPin, FiShoppingBag, FiTrendingUp, FiCalendar, FiStar } = FiIcons;

const HomePage = () => {
  const navigate = useNavigate();
  const { cityName } = useStore();

  const quickActions = [
    {
      id: 'ai-assistant',
      title: 'Ask AI Assistant',
      subtitle: 'Get instant answers about your community',
      icon: FiMessageCircle,
      color: 'bg-blue-500',
      path: '/ai-assistant'
    },
    {
      id: 'news',
      title: 'Local News',
      subtitle: 'Stay updated with community happenings',
      icon: FiNewspaper,
      color: 'bg-green-500',
      path: '/news'
    },
    {
      id: 'businesses',
      title: 'Find Businesses',
      subtitle: 'Discover local shops and services',
      icon: FiMapPin,
      color: 'bg-purple-500',
      path: '/businesses'
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      subtitle: 'Buy, sell, and trade locally',
      icon: FiShoppingBag,
      color: 'bg-orange-500',
      path: '/marketplace'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'news',
      title: 'City Council Meeting Tonight',
      time: '2 hours ago',
      icon: FiCalendar
    },
    {
      id: 2,
      type: 'business',
      title: 'New Restaurant Opening Downtown',
      time: '4 hours ago',
      icon: FiStar
    },
    {
      id: 3,
      type: 'trending',
      title: 'Weather Alert: Heavy Rain Expected',
      time: '6 hours ago',
      icon: FiTrendingUp
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome to {cityName}
        </h1>
        <p className="text-primary-100 mb-4">
          Your community hub for news, services, and connections
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/ai-assistant')}
          className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
        >
          <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
          <span>Ask Me Anything</span>
        </motion.button>
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-left"
            >
              <div className={`${action.color} rounded-lg w-12 h-12 flex items-center justify-center mb-3`}>
                <SafeIcon icon={action.icon} className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {action.subtitle}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-3"
            >
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg w-10 h-10 flex items-center justify-center">
                <SafeIcon icon={item.icon} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weather Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Today's Weather</h3>
            <p className="text-blue-100">Partly cloudy, 72°F</p>
          </div>
          <div className="text-4xl">🌤️</div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;