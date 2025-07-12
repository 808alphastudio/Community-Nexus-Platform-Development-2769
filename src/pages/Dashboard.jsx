import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import useStore from '../store/useStore';
import WeatherWidget from '../components/weather/WeatherWidget';
import CommunityMap from '../components/map/CommunityMap';
import EmergencyAlerts from '../components/common/EmergencyAlerts';

const { 
  FiGrid, 
  FiList, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiActivity, 
  FiCalendar, 
  FiUsers, 
  FiMessageCircle, 
  FiShoppingBag,
  FiClock
} = FiIcons;

const Dashboard = () => {
  const { cityName } = useStore();
  const [layoutMode, setLayoutMode] = useState('grid');
  const [widgets, setWidgets] = useState([
    { id: 'weather', title: 'Weather', type: 'weather', enabled: true, order: 1 },
    { id: 'events', title: 'Upcoming Events', type: 'events', enabled: true, order: 2 },
    { id: 'news', title: 'Latest News', type: 'news', enabled: true, order: 3 },
    { id: 'map', title: 'Community Map', type: 'map', enabled: true, order: 4 },
    { id: 'activity', title: 'Community Activity', type: 'activity', enabled: true, order: 5 }
  ]);

  // Mock data for widgets
  const upcomingEvents = [
    { 
      id: 1, 
      title: 'Farmers Market', 
      date: '2024-06-15', 
      time: '8:00 AM - 1:00 PM', 
      location: 'Main Street Plaza' 
    },
    { 
      id: 2, 
      title: 'City Council Meeting', 
      date: '2024-06-18', 
      time: '7:00 PM - 9:00 PM', 
      location: 'City Hall' 
    },
    { 
      id: 3, 
      title: 'Summer Concert Series', 
      date: '2024-06-20', 
      time: '6:30 PM', 
      location: 'Community Park' 
    }
  ];

  const latestNews = [
    {
      id: 1,
      title: 'New Community Center Opening Next Month',
      summary: 'The long-awaited community center will open its doors on July 15th with a grand opening celebration.',
      time: '2 hours ago',
      source: 'City News'
    },
    {
      id: 2,
      title: 'Local Business Spotlight: Downtown Bakery',
      summary: 'Meet the family behind our city\'s most beloved bakery and their 50-year tradition.',
      time: '5 hours ago',
      source: 'Community Journal'
    },
    {
      id: 3,
      title: 'Road Construction Update: Main Street Project',
      summary: 'Construction on Main Street is ahead of schedule and expected to complete by the end of the month.',
      time: '1 day ago',
      source: 'Public Works Department'
    }
  ];

  const communityActivity = [
    {
      id: 1,
      type: 'marketplace',
      content: 'New listings in the marketplace: 5 items added in the last hour',
      icon: FiShoppingBag,
      time: '1 hour ago'
    },
    {
      id: 2,
      type: 'discussion',
      content: 'Active discussion: "Ideas for improving the downtown area" - 23 new comments',
      icon: FiMessageCircle,
      time: '3 hours ago'
    },
    {
      id: 3,
      type: 'event',
      content: 'Community cleanup event now has 45 volunteers signed up',
      icon: FiUsers,
      time: '5 hours ago'
    }
  ];

  // Filter enabled widgets and sort by order
  const enabledWidgets = widgets
    .filter(widget => widget.enabled)
    .sort((a, b) => a.order - b.order);

  // Toggle widget enabled state
  const toggleWidget = (id) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  // Render widget based on type
  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'weather':
        return <WeatherWidget cityName={cityName} />;
      
      case 'events':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <SafeIcon icon={FiCalendar} className="w-5 h-5 mr-2 text-primary-500" />
                Upcoming Events
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-sm text-primary-600 dark:text-primary-400"
              >
                View All
              </motion.button>
            </div>
            
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <motion.div 
                  key={event.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">{event.title}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="flex items-center">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 'news':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <SafeIcon icon={FiActivity} className="w-5 h-5 mr-2 text-primary-500" />
                Latest News
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-sm text-primary-600 dark:text-primary-400"
              >
                View All
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {latestNews.map(news => (
                <motion.div 
                  key={news.id}
                  whileHover={{ scale: 1.01 }}
                  className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0 cursor-pointer"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">{news.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{news.summary}</p>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{news.source}</span>
                    <span>{news.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 'map':
        return <CommunityMap />;
      
      case 'activity':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <SafeIcon icon={FiUsers} className="w-5 h-5 mr-2 text-primary-500" />
                Community Activity
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-sm text-primary-600 dark:text-primary-400"
              >
                View All
              </motion.button>
            </div>
            
            <div className="space-y-3">
              {communityActivity.map(activity => (
                <motion.div 
                  key={activity.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
                >
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={activity.icon} className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{activity.content}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {widget.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Widget content would display here</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Emergency Alerts Component */}
      <EmergencyAlerts />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your personalized view of {cityName}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setLayoutMode('grid')}
            className={`p-2 rounded-lg ${
              layoutMode === 'grid' 
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <SafeIcon icon={FiGrid} className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setLayoutMode('list')}
            className={`p-2 rounded-lg ${
              layoutMode === 'list' 
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <SafeIcon icon={FiList} className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-primary-600 text-white"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Widgets */}
      <div className={`${
        layoutMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
          : 'space-y-4'
      }`}>
        {enabledWidgets.map(widget => (
          <div key={widget.id} className="relative group">
            {renderWidget(widget)}
            
            {/* Widget Controls - Show on hover */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleWidget(widget.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Widget Manager */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Manage Widgets
        </h3>
        
        <div className="space-y-2">
          {widgets.map(widget => (
            <div 
              key={widget.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 mr-3 rounded-sm border ${
                  widget.enabled 
                    ? 'bg-primary-500 border-primary-500 dark:bg-primary-400 dark:border-primary-400' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {widget.enabled && (
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{widget.title}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleWidget(widget.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    widget.enabled
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}
                >
                  {widget.enabled ? 'Enabled' : 'Disabled'}
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;