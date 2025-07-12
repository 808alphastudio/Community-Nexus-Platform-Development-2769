import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import useStore from '../store/useStore';

const { FiClock, FiTrendingUp, FiEye, FiExternalLink } = FiIcons;

const NewsCenter = () => {
  const navigate = useNavigate();
  const { cityName } = useStore();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All News' },
    { id: 'breaking', label: 'Breaking' },
    { id: 'local', label: 'Local' },
    { id: 'government', label: 'Government' },
    { id: 'events', label: 'Events' }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'City Council Approves New Downtown Development',
      summary: 'The city council voted 7-2 to approve the new mixed-use development project that will bring 200 residential units and retail space to downtown.',
      category: 'government',
      author: 'Sarah Johnson',
      publishedAt: '2024-01-15T10:30:00Z',
      readTime: 3,
      views: 1250,
      isBreaking: false,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Weather Alert: Heavy Snow Expected This Weekend',
      summary: 'National Weather Service issues winter storm warning with 6-10 inches of snow expected Friday night through Saturday.',
      category: 'breaking',
      author: 'Weather Service',
      publishedAt: '2024-01-15T08:15:00Z',
      readTime: 2,
      views: 3420,
      isBreaking: true,
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'New Restaurant Opens on Main Street',
      summary: 'Local chef Maria Rodriguez opens her dream restaurant featuring authentic Mexican cuisine in the heart of downtown.',
      category: 'local',
      author: 'Food Reporter',
      publishedAt: '2024-01-14T16:45:00Z',
      readTime: 4,
      views: 892,
      isBreaking: false,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Annual Music Festival Announces Lineup',
      summary: 'The summer music festival reveals this year\'s headliners including several Grammy-winning artists and local bands.',
      category: 'events',
      author: 'Entertainment Desk',
      publishedAt: '2024-01-14T14:20:00Z',
      readTime: 3,
      views: 2156,
      isBreaking: false,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop'
    }
  ];

  const filteredNews = activeTab === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeTab);

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {cityName} News
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay informed with the latest community updates
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* News Articles */}
      <div className="space-y-4">
        {filteredNews.map((article) => (
          <motion.div
            key={article.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate(`/news/${article.id}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
          >
            {article.isBreaking && (
              <div className="bg-danger text-white px-4 py-2 text-sm font-medium">
                🚨 BREAKING NEWS
              </div>
            )}
            
            <div className="relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {article.readTime} min read
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  article.category === 'breaking' ? 'bg-red-100 text-red-800' :
                  article.category === 'government' ? 'bg-blue-100 text-blue-800' :
                  article.category === 'local' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
                <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {article.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {article.summary}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  By {article.author}
                </span>
                <SafeIcon icon={FiExternalLink} className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trending Topics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-3">
          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Trending Topics</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['City Council', 'Weather Alert', 'New Business', 'Traffic Update', 'School District'].map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              #{topic.replace(' ', '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCenter;