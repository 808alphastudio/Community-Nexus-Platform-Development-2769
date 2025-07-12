import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import useStore from '../store/useStore';

const { FiUser, FiSettings, FiBell, FiHeart, FiShoppingBag, FiCreditCard, FiLogOut, FiEdit } = FiIcons;

const UserProfile = () => {
  const { user, userType, logout } = useStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'favorites', label: 'Favorites', icon: FiHeart },
    { id: 'listings', label: 'My Listings', icon: FiShoppingBag },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Basic access to all content',
        'Limited marketplace posting (3/month)',
        'Standard AI assistant usage',
        'Basic personalization'
      ]
    },
    {
      id: 'paid',
      name: 'Premium',
      price: '$9.99',
      period: 'per month',
      features: [
        'Unlimited marketplace postings',
        'Priority AI assistant responses',
        'Advanced search filters',
        'Customizable dashboard',
        'Email digest customization'
      ]
    },
    {
      id: 'publisher',
      name: 'Publisher',
      price: '$29.99',
      period: 'per month',
      features: [
        'All Premium features',
        'Original news content creation',
        'Analytics dashboard',
        'Featured business placement',
        'Revenue sharing program'
      ]
    }
  ];

  const mockFavorites = [
    {
      id: 1,
      type: 'business',
      name: 'Maria\'s Authentic Mexican',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      type: 'listing',
      name: '2BR Downtown Apartment',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop'
    }
  ];

  const mockListings = [
    {
      id: 1,
      title: 'Vintage Guitar - Excellent Condition',
      price: '$850',
      status: 'active',
      views: 45,
      postedAt: '2024-01-13'
    },
    {
      id: 2,
      title: 'Mountain Bike for Sale',
      price: '$300',
      status: 'sold',
      views: 23,
      postedAt: '2024-01-10'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    John Doe
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">john.doe@email.com</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    userType === 'publisher' ? 'bg-purple-100 text-purple-800' :
                    userType === 'paid' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {userType === 'publisher' ? 'Publisher' : userType === 'paid' ? 'Premium' : 'Free'} Member
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <SafeIcon icon={FiEdit} className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Subscription Plans */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Subscription Plans
              </h3>
              <div className="space-y-4">
                {subscriptionPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.01 }}
                    className={`border rounded-lg p-4 ${
                      userType === plan.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {plan.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {plan.price} {plan.period}
                        </p>
                      </div>
                      {userType === plan.id ? (
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                          Current Plan
                        </span>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700"
                        >
                          Upgrade
                        </motion.button>
                      )}
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Favorites
            </h3>
            {mockFavorites.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center space-x-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.type === 'business' ? 'Business' : 'Marketplace Listing'}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                >
                  <SafeIcon icon={FiHeart} className="w-5 h-5 fill-current" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        );

      case 'listings':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                My Listings
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Create Listing
              </motion.button>
            </div>
            {mockListings.map((listing) => (
              <motion.div
                key={listing.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {listing.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.status === 'active' ? 'Active' : 'Sold'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-primary-600">{listing.price}</span>
                  <span>{listing.views} views</span>
                  <span>Posted {listing.postedAt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Settings
            </h3>
            
            <div className="space-y-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Notifications</span>
                </div>
                <span className="text-gray-400">→</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiCreditCard} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Payment Methods</span>
                </div>
                <span className="text-gray-400">→</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between text-red-600"
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiLogOut} className="w-5 h-5" />
                  <span>Sign Out</span>
                </div>
                <span className="text-gray-400">→</span>
              </motion.button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-3 rounded-lg border ${
              activeTab === tab.id
                ? 'bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <SafeIcon icon={tab.icon} className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default UserProfile;