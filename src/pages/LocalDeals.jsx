import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiPercent, FiClock, FiMapPin, FiTag, FiStar } = FiIcons;

const LocalDeals = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Deals' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'retail', label: 'Retail' },
    { id: 'services', label: 'Services' },
    { id: 'entertainment', label: 'Entertainment' }
  ];

  const deals = [
    {
      id: 1,
      title: '50% Off Dinner for Two',
      business: 'Maria\'s Authentic Mexican',
      category: 'restaurants',
      discount: '50%',
      originalPrice: '$40',
      salePrice: '$20',
      description: 'Enjoy a romantic dinner with authentic Mexican cuisine. Valid Sunday-Thursday.',
      expiresAt: '2024-01-31T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop',
      rating: 4.8,
      location: 'Downtown',
      isPopular: true
    },
    {
      id: 2,
      title: 'Buy 2 Get 1 Free Coffee',
      business: 'Corner Coffee House',
      category: 'restaurants',
      discount: '33%',
      originalPrice: '$15',
      salePrice: '$10',
      description: 'Perfect for your morning routine or afternoon pick-me-up.',
      expiresAt: '2024-01-25T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop',
      rating: 4.4,
      location: 'Coffee District',
      isPopular: false
    },
    {
      id: 3,
      title: '25% Off All Clothing',
      business: 'Boutique Fashion Store',
      category: 'retail',
      discount: '25%',
      originalPrice: '$100',
      salePrice: '$75',
      description: 'Spring collection sale! Latest trends and styles available.',
      expiresAt: '2024-02-15T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      rating: 4.7,
      location: 'Fashion Boulevard',
      isPopular: false
    },
    {
      id: 4,
      title: 'Free Oil Change with Service',
      business: 'Downtown Auto Repair',
      category: 'services',
      discount: '100%',
      originalPrice: '$30',
      salePrice: 'Free',
      description: 'Free oil change when you book any service over $100.',
      expiresAt: '2024-01-30T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop',
      rating: 4.6,
      location: 'Auto District',
      isPopular: true
    },
    {
      id: 5,
      title: 'Movie Night Special',
      business: 'Grand Cinema',
      category: 'entertainment',
      discount: '40%',
      originalPrice: '$25',
      salePrice: '$15',
      description: 'Two movie tickets plus popcorn and drinks. Tuesday nights only.',
      expiresAt: '2024-02-28T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1489185078254-c3365d6e359f?w=300&h=200&fit=crop',
      rating: 4.5,
      location: 'Entertainment District',
      isPopular: false
    },
    {
      id: 6,
      title: 'House Cleaning - First Visit 50% Off',
      business: 'Professional Cleaning Services',
      category: 'services',
      discount: '50%',
      originalPrice: '$120',
      salePrice: '$60',
      description: 'Professional deep cleaning for your home. New customers only.',
      expiresAt: '2024-01-28T23:59:59Z',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
      rating: 4.5,
      location: 'Service Area',
      isPopular: true
    }
  ];

  const filteredDeals = activeCategory === 'all' 
    ? deals 
    : deals.filter(deal => deal.category === activeCategory);

  const getDaysLeft = (expiresAt) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Expires today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <SafeIcon key={i} icon={FiStar} className="w-3 h-3 text-yellow-400 fill-current" />
      );
    }
    
    if (rating % 1 !== 0) {
      stars.push(
        <SafeIcon key="half" icon={FiStar} className="w-3 h-3 text-yellow-400 fill-current opacity-50" />
      );
    }

    return stars;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Local Deals
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover amazing offers from local businesses
        </p>
      </div>

      {/* Deal of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center space-x-2 mb-2">
          <SafeIcon icon={FiPercent} className="w-5 h-5" />
          <span className="font-semibold">Deal of the Day</span>
        </div>
        <h2 className="text-xl font-bold mb-1">50% Off Dinner for Two</h2>
        <p className="text-secondary-100 mb-3">at Maria's Authentic Mexican</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white text-secondary-600 px-6 py-2 rounded-lg font-medium"
        >
          Claim Deal
        </motion.button>
      </motion.div>

      {/* Categories */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg border whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <span className="text-sm font-medium">{category.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="space-y-4">
        {filteredDeals.map((deal) => (
          <motion.div
            key={deal.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {deal.isPopular && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-medium">
                🔥 Popular Deal
              </div>
            )}
            
            <div className="relative">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-danger text-white px-3 py-1 rounded-full text-sm font-bold">
                {deal.discount} OFF
              </div>
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {getDaysLeft(deal.expiresAt)}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {deal.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    at {deal.business}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {renderStars(deal.rating)}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {deal.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {deal.salePrice}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {deal.originalPrice}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {deal.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                    <span>{deal.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-3 h-3" />
                    <span>{getDaysLeft(deal.expiresAt)}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  deal.category === 'restaurants' ? 'bg-orange-100 text-orange-800' :
                  deal.category === 'retail' ? 'bg-blue-100 text-blue-800' :
                  deal.category === 'services' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  <SafeIcon icon={FiTag} className="w-3 h-3 inline mr-1" />
                  {deal.category.charAt(0).toUpperCase() + deal.category.slice(1)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Claim This Deal
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LocalDeals;