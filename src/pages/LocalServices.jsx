import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiSearch, FiFilter, FiStar, FiMapPin, FiPhone, FiClock, FiMail, FiCheck } = FiIcons;

const LocalServices = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'home', label: 'Home Services' },
    { id: 'health', label: 'Healthcare' },
    { id: 'professional', label: 'Professional' },
    { id: 'education', label: 'Education' },
    { id: 'beauty', label: 'Beauty & Wellness' }
  ];

  // Mock services data
  const services = [
    {
      id: 1,
      name: 'Elite Plumbing Solutions',
      category: 'home',
      rating: 4.8,
      reviewCount: 156,
      address: '123 Main Street',
      phone: '(555) 123-4567',
      email: 'service@eliteplumbing.com',
      hours: 'Available 24/7 for emergencies',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45249be80?w=300&h=200&fit=crop',
      description: 'Professional plumbing services for residential and commercial properties. Emergency repairs, installations, and maintenance.',
      features: ['24/7 Emergency Service', 'Licensed & Insured', 'Free Estimates', 'Same-Day Service'],
      isFeatured: true,
      isVerified: true
    },
    {
      id: 2,
      name: 'Family Medical Center',
      category: 'health',
      rating: 4.9,
      reviewCount: 213,
      address: '456 Health Drive',
      phone: '(555) 234-5678',
      email: 'info@familymedical.com',
      hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-1PM',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&h=200&fit=crop',
      description: 'Comprehensive family healthcare services including preventive care, pediatrics, and adult medicine. Accepting new patients.',
      features: ['Telehealth Available', 'Most Insurance Accepted', 'On-site Lab', 'Same-Day Appointments'],
      isFeatured: true,
      isVerified: true
    },
    {
      id: 3,
      name: 'Johnson Tax & Accounting',
      category: 'professional',
      rating: 4.7,
      reviewCount: 98,
      address: '789 Business Blvd',
      phone: '(555) 345-6789',
      email: 'contact@johnsontax.com',
      hours: 'Mon-Fri: 9AM-5PM',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
      description: 'Professional tax preparation, accounting, and financial planning services for individuals and small businesses.',
      features: ['Tax Preparation', 'Bookkeeping', 'Business Consulting', 'Financial Planning'],
      isFeatured: false,
      isVerified: true
    },
    {
      id: 4,
      name: 'Sunshine Daycare & Learning Center',
      category: 'education',
      rating: 4.6,
      reviewCount: 124,
      address: '101 Education Lane',
      phone: '(555) 456-7890',
      email: 'info@sunshinedaycare.com',
      hours: 'Mon-Fri: 6:30AM-6:30PM',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop',
      description: 'Licensed childcare facility offering programs for infants, toddlers, and preschoolers. Curriculum focuses on early childhood development.',
      features: ['Licensed Staff', 'Age-Appropriate Curriculum', 'Secure Facility', 'Nutritious Meals'],
      isFeatured: false,
      isVerified: true
    },
    {
      id: 5,
      name: 'Serenity Spa & Wellness',
      category: 'beauty',
      rating: 4.7,
      reviewCount: 187,
      address: '222 Relaxation Road',
      phone: '(555) 567-8901',
      email: 'appointments@serenityspa.com',
      hours: 'Tue-Sat: 10AM-8PM, Sun: 12PM-5PM',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&h=200&fit=crop',
      description: 'Full-service spa offering massages, facials, body treatments, and wellness services in a tranquil environment.',
      features: ['Massage Therapy', 'Skin Care', 'Body Treatments', 'Wellness Programs'],
      isFeatured: true,
      isVerified: false
    },
    {
      id: 6,
      name: 'Green Lawn Landscaping',
      category: 'home',
      rating: 4.5,
      reviewCount: 76,
      address: '333 Garden Way',
      phone: '(555) 678-9012',
      email: 'service@greenlawn.com',
      hours: 'Mon-Sat: 7AM-7PM',
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=200&fit=crop',
      description: 'Professional landscaping services including lawn maintenance, hardscaping, planting, and seasonal cleanup.',
      features: ['Lawn Maintenance', 'Garden Design', 'Hardscaping', 'Seasonal Services'],
      isFeatured: false,
      isVerified: true
    }
  ];

  // Filter services by category
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  // Rating stars component
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
          Local Services Directory
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find trusted service providers in your community
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
          placeholder="Search services..."
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

      {/* Service Listings */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate(`/services/${service.id}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
          >
            {service.isFeatured && (
              <div className="bg-secondary-500 text-white px-4 py-2 text-sm font-medium">
                ⭐ Featured Service Provider
              </div>
            )}
            
            <div className="flex">
              <img
                src={service.image}
                alt={service.name}
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      {service.name}
                      {service.isVerified && (
                        <span className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </h3>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      service.category === 'home' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      service.category === 'health' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      service.category === 'professional' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      service.category === 'education' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                      {categories.find(c => c.id === service.category)?.label || 'Service'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {renderStars(service.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">
                      {service.rating}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      ({service.reviewCount})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiMapPin} className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{service.address}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiPhone} className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{service.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiMail} className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{service.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{service.hours.split(',')[0]}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    >
                      <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1 text-green-500" />
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      +{service.features.length - 3} more
                    </span>
                  )}
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
          Load More Services
        </motion.button>
      </div>
    </div>
  );
};

export default LocalServices;