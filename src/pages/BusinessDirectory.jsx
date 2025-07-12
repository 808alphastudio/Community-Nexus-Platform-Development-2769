import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiSearch, FiFilter, FiStar, FiMapPin, FiClock, FiPhone, FiGlobe } = FiIcons;

const BusinessDirectory = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'retail', label: 'Retail' },
    { id: 'services', label: 'Services' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'automotive', label: 'Automotive' }
  ];

  const businesses = [
    {
      id: 1,
      name: 'Maria\'s Authentic Mexican',
      category: 'restaurants',
      rating: 4.8,
      reviewCount: 127,
      address: '123 Main Street',
      phone: '(555) 123-4567',
      website: 'mariasrestaurant.com',
      hours: 'Open until 10:00 PM',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop',
      description: 'Authentic Mexican cuisine with fresh ingredients and traditional recipes.',
      isFeatured: true
    },
    {
      id: 2,
      name: 'Downtown Auto Repair',
      category: 'automotive',
      rating: 4.6,
      reviewCount: 89,
      address: '456 Oak Avenue',
      phone: '(555) 234-5678',
      website: 'downtownauto.com',
      hours: 'Open until 6:00 PM',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop',
      description: 'Full-service auto repair with certified mechanics and quality parts.',
      isFeatured: false
    },
    {
      id: 3,
      name: 'City Medical Center',
      category: 'healthcare',
      rating: 4.9,
      reviewCount: 203,
      address: '789 Health Drive',
      phone: '(555) 345-6789',
      website: 'citymedical.org',
      hours: 'Open 24 hours',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&h=200&fit=crop',
      description: 'Comprehensive healthcare services with experienced medical professionals.',
      isFeatured: true
    },
    {
      id: 4,
      name: 'Boutique Fashion Store',
      category: 'retail',
      rating: 4.7,
      reviewCount: 156,
      address: '321 Fashion Boulevard',
      phone: '(555) 456-7890',
      website: 'boutiquefashion.com',
      hours: 'Open until 8:00 PM',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      description: 'Trendy clothing and accessories for fashion-forward individuals.',
      isFeatured: false
    },
    {
      id: 5,
      name: 'Professional Cleaning Services',
      category: 'services',
      rating: 4.5,
      reviewCount: 74,
      address: '654 Service Lane',
      phone: '(555) 567-8901',
      website: 'proclean.com',
      hours: 'Open until 5:00 PM',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
      description: 'Professional residential and commercial cleaning services.',
      isFeatured: false
    },
    {
      id: 6,
      name: 'Corner Coffee House',
      category: 'restaurants',
      rating: 4.4,
      reviewCount: 312,
      address: '987 Coffee Street',
      phone: '(555) 678-9012',
      website: 'cornercoffee.com',
      hours: 'Open until 9:00 PM',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop',
      description: 'Artisan coffee, fresh pastries, and cozy atmosphere for work or relaxation.',
      isFeatured: true
    }
  ];

  const filteredBusinesses = activeCategory === 'all' 
    ? businesses 
    : businesses.filter(business => business.category === activeCategory);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <SafeIcon key={i} icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <SafeIcon key="half" icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <SafeIcon key={`empty-${i}`} icon={FiStar} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Business Directory
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover local businesses and services
        </p>
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
          placeholder="Search businesses..."
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

      {/* Business Listings */}
      <div className="space-y-4">
        {filteredBusinesses.map((business) => (
          <motion.div
            key={business.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate(`/business/${business.id}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
          >
            {business.isFeatured && (
              <div className="bg-secondary-500 text-white px-4 py-2 text-sm font-medium">
                ⭐ Featured Business
              </div>
            )}
            
            <div className="flex">
              <img
                src={business.image}
                alt={business.name}
                className="w-24 h-24 object-cover"
              />
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {business.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    business.category === 'restaurants' ? 'bg-orange-100 text-orange-800' :
                    business.category === 'retail' ? 'bg-blue-100 text-blue-800' :
                    business.category === 'services' ? 'bg-green-100 text-green-800' :
                    business.category === 'healthcare' ? 'bg-red-100 text-red-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {business.category.charAt(0).toUpperCase() + business.category.slice(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {renderStars(business.rating)}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {business.rating}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({business.reviewCount} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {business.description}
                </p>

                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                    <span>{business.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiClock} className="w-3 h-3" />
                    <span>{business.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium"
        >
          Load More Businesses
        </motion.button>
      </div>
    </div>
  );
};

export default BusinessDirectory;