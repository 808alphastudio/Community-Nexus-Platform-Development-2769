import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import useStore from '../store/useStore';

const { FiBook, FiBarChart, FiMapPin, FiUsers, FiMessageCircle, FiHeart } = FiIcons;

const CommunityHub = () => {
  const { cityName } = useStore();
  const [activeSection, setActiveSection] = useState('localpedia');

  const sections = [
    { id: 'localpedia', label: 'Localpedia', icon: FiBook },
    { id: 'data', label: 'Data', icon: FiBarChart },
    { id: 'directory', label: 'Directory', icon: FiMapPin },
    { id: 'community', label: 'Community', icon: FiUsers }
  ];

  const localpediaEntries = [
    {
      id: 1,
      title: 'Historic Downtown District',
      summary: 'The heart of our city, featuring buildings dating back to the 1890s...',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop',
      contributors: 5,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'City Park and Recreation Center',
      summary: 'A 50-acre park featuring walking trails, playground, and community center...',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
      contributors: 3,
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Annual Harvest Festival',
      summary: 'Celebrating our agricultural heritage since 1952...',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      contributors: 8,
      lastUpdated: '3 days ago'
    }
  ];

  const communityStats = [
    { label: 'Population', value: '45,230', change: '+2.3%' },
    { label: 'Median Age', value: '34.5', change: '+0.8%' },
    { label: 'Households', value: '18,940', change: '+1.9%' },
    { label: 'Businesses', value: '2,156', change: '+5.2%' }
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      content: 'Looking for volunteers for this weekend\'s park cleanup! Anyone interested in joining?',
      likes: 24,
      comments: 8,
      time: '2 hours ago',
      type: 'volunteer'
    },
    {
      id: 2,
      author: 'Mike R.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      content: 'Just moved to the downtown area! Any recommendations for good coffee shops?',
      likes: 15,
      comments: 12,
      time: '4 hours ago',
      type: 'question'
    },
    {
      id: 3,
      author: 'Local Arts Council',
      avatar: 'https://images.unsplash.com/photo-1523365774497-afbf95f49fb5?w=50&h=50&fit=crop',
      content: 'Art in the Park series starts next week! Every Wednesday evening in Central Park.',
      likes: 45,
      comments: 6,
      time: '1 day ago',
      type: 'announcement',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=200&fit=crop'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'localpedia':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {cityName} Localpedia
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Add Entry
              </motion.button>
            </div>
            {localpediaEntries.map((entry) => (
              <motion.div
                key={entry.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex">
                  <img src={entry.image} alt={entry.title} className="w-24 h-24 object-cover" />
                  <div className="p-4 flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {entry.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {entry.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{entry.contributors} contributors</span>
                      <span>Updated {entry.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Community Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {communityStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {stat.label}
                  </div>
                  <div className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last year
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Community Discussion
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
              >
                <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                <span>New Post</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {communityPosts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {post.author}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {post.time}
                        </span>
                      </div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        post.type === 'volunteer' ? 'bg-green-100 text-green-800' :
                        post.type === 'question' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {post.content}
                  </p>

                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post attachment"
                      className="rounded-lg mb-3 w-full h-48 object-cover"
                    />
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600">
                        <SafeIcon icon={FiHeart} className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600">
                        <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                        <span>{post.comments} comments</span>
                      </button>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700">
                      Reply
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'directory':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Community Directory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Schools', 'Parks', 'Libraries', 'Community Centers'].map((facility) => (
                <motion.div
                  key={facility}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {facility}
                  </h4>
                  <button className="text-primary-600 text-sm hover:text-primary-700">
                    View All →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Content for {activeSection}</div>;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Community Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover, learn, and connect with your community
        </p>
      </div>

      {/* Section Tabs */}
      <div className="grid grid-cols-4 gap-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(section.id)}
            className={`flex flex-col items-center p-3 rounded-lg border ${
              activeSection === section.id
                ? 'bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <SafeIcon icon={section.icon} className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{section.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default CommunityHub;