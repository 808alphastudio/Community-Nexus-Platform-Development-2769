import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiSearch, FiFilter, FiPlus, FiHeart, FiMapPin, FiClock, FiDollarSign } = FiIcons;

const Marketplace = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All', icon: FiSearch },
    { id: 'realestate', label: 'Real Estate', icon: FiMapPin },
    { id: 'automotive', label: 'Automotive', icon: FiDollarSign },
    { id: 'jobs', label: 'Jobs', icon: FiClock },
    { id: 'general', label: 'General', icon: FiHeart }
  ];

  const listings = [
    {
      id: 1,
      title: '2BR Downtown Apartment',
      price: '$1,200/month',
      category: 'realestate',
      location: 'Downtown District',
      postedAt: '2024-01-15T10:00:00Z',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop',
      seller: 'Property Manager',
      isFeatured: true
    },
    // ... rest of the listings
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleListingClick = (id) => {
    navigate(`/marketplace/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredListings = activeCategory === 'all' 
    ? listings 
    : listings.filter(listing => listing.category === activeCategory);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Buy, sell, and discover locally
          </p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="bg-primary-600 text-white p-3 rounded-lg"
        >
          <SafeIcon icon={FiPlus} className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <SafeIcon 
          icon={FiSearch} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search marketplace..."
          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
        >
          <SafeIcon icon={FiFilter} className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Categories */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <SafeIcon icon={category.icon} className="w-4 h-4" />
            <span className="text-sm font-medium">{category.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredListings.map((listing) => (
          <motion.div
            key={listing.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleListingClick(listing.id)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
          >
            {/* ... rest of the listing card content ... */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;