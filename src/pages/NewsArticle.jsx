import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiArrowLeft, FiClock, FiEye, FiHeart, FiShare2, FiUser, FiExternalLink } = FiIcons;

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock article data - in real app, fetch based on ID
  const article = {
    id: 1,
    title: 'City Council Approves New Downtown Development',
    summary: 'The city council voted 7-2 to approve the new mixed-use development project that will bring 200 residential units and retail space to downtown.',
    content: `
      <p>In a landmark decision that will reshape the downtown landscape, the city council voted 7-2 Tuesday night to approve a major mixed-use development project that promises to bring new life to the city center.</p>
      
      <p>The $45 million project, proposed by Downtown Development Partners, will include 200 residential units, 15,000 square feet of retail space, and a 300-space parking garage. The development will occupy the current site of the old Riverside Mall, which has been vacant for over three years.</p>
      
      <p>"This project represents a significant investment in our downtown core," said Mayor Jennifer Walsh during the meeting. "It will provide much-needed housing options and bring new businesses to support our local economy."</p>
      
      <p>The development will feature a mix of studio, one-bedroom, and two-bedroom apartments, with 20% designated as affordable housing units. Ground-floor retail spaces are designed to attract restaurants, cafes, and local businesses.</p>
      
      <p>Construction is expected to begin in spring 2024, with the first phase of residential units opening in late 2025. The project is estimated to create 300 construction jobs and 150 permanent positions once completed.</p>
      
      <p>Council members Sarah Thompson and Michael Rodriguez voted against the proposal, citing concerns about traffic impact and parking availability in the downtown area.</p>
      
      <p>"While I support downtown revitalization, I believe we need to address infrastructure concerns before adding this much density," Thompson said during the public comment period.</p>
      
      <p>The developer has agreed to contribute $2 million toward traffic improvements and public transit enhancements as part of the approval conditions.</p>
    `,
    category: 'government',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15T10:30:00Z',
    readTime: 3,
    views: 1250,
    likes: 89,
    isBreaking: false,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    tags: ['City Council', 'Development', 'Downtown', 'Housing'],
    sources: [
      'City Council Meeting Minutes',
      'Downtown Development Partners Press Release',
      'Mayor\'s Office Statement'
    ]
  };

  const relatedArticles = [
    {
      id: 2,
      title: 'Downtown Parking Study Results Released',
      summary: 'New study shows downtown parking utilization at 78% capacity during peak hours.',
      publishedAt: '2024-01-12T14:20:00Z',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Local Business Coalition Supports Development',
      summary: 'Chamber of Commerce endorses mixed-use project for economic benefits.',
      publishedAt: '2024-01-10T09:15:00Z',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop'
    }
  ];

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="flex items-center justify-between p-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <SafeIcon icon={FiHeart} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <SafeIcon icon={FiShare2} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Breaking News Banner */}
        {article.isBreaking && (
          <div className="bg-danger text-white px-4 py-2 rounded-lg text-sm font-medium">
            🚨 BREAKING NEWS
          </div>
        )}

        {/* Article Header */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              article.category === 'government' ? 'bg-blue-100 text-blue-800' :
              article.category === 'local' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {article.summary}
          </p>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">By {article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {formatTimeAgo(article.publishedAt)} • {article.readTime} min read
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>{article.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiHeart} className="w-4 h-4" />
                <span>{article.likes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                #{tag.replace(' ', '')}
              </span>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sources</h3>
          <div className="space-y-2">
            {article.sources.map((source, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                <span>{source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Articles</h3>
          <div className="space-y-4">
            {relatedArticles.map((related) => (
              <motion.div
                key={related.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/news/${related.id}`)}
                className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {related.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {related.summary}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(related.publishedAt)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Share Article */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Share this article</h3>
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
            >
              Share on Facebook
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-blue-400 text-white py-2 px-4 rounded-lg font-medium"
            >
              Share on Twitter
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium"
            >
              Copy Link
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;