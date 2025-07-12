import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import useStore from '../store/useStore';

const { FiBook, FiBarChart, FiCalendar, FiMapPin, FiUsers, FiClock } = FiIcons;

const CommunityHub = () => {
  const { cityName } = useStore();
  const [activeSection, setActiveSection] = useState('localpedia');

  const sections = [
    { id: 'localpedia', label: 'Localpedia', icon: FiBook },
    { id: 'data', label: 'Data', icon: FiBarChart },
    { id: 'events', label: 'Events', icon: FiCalendar },
    { id: 'directory', label: 'Directory', icon: FiMapPin }
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

  const upcomingEvents = [
    {
      id: 1,
      title: 'City Council Meeting',
      date: '2024-01-18',
      time: '7:00 PM',
      location: 'City Hall',
      category: 'Government'
    },
    {
      id: 2,
      title: 'Farmers Market',
      date: '2024-01-20',
      time: '8:00 AM',
      location: 'Main Street',
      category: 'Community'
    },
    {
      id: 3,
      title: 'Library Book Club',
      date: '2024-01-22',
      time: '6:30 PM',
      location: 'Public Library',
      category: 'Culture'
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
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-24 h-24 object-cover"
                  />
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
                  <div className={`text-xs font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last year
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Current Weather
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">72°F</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Partly Cloudy</div>
                </div>
                <div className="text-4xl">🌤️</div>
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upcoming Events
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Add Event
              </motion.button>
            </div>

            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {event.title}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiClock} className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.category === 'Government' ? 'bg-blue-100 text-blue-800' :
                    event.category === 'Community' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {event.category}
                  </span>
                </div>
              </motion.div>
            ))}
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