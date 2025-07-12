import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import useStore from '../store/useStore';

const { FiCalendar, FiClock, FiMapPin, FiTag, FiFilter, FiPlus, FiChevronLeft, FiChevronRight, FiUsers } = FiIcons;

const EventsCalendar = () => {
  const { cityName } = useStore();
  const [activeView, setActiveView] = useState('list');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'community', label: 'Community' },
    { id: 'government', label: 'Government' },
    { id: 'arts', label: 'Arts & Culture' },
    { id: 'sports', label: 'Sports' },
    { id: 'education', label: 'Education' }
  ];

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Farmers Market',
      date: '2024-06-15',
      time: '8:00 AM - 1:00 PM',
      location: 'Main Street Plaza',
      category: 'community',
      description: 'Weekly farmers market featuring local produce, crafts, and food vendors.',
      attendees: 120,
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'City Council Meeting',
      date: '2024-06-18',
      time: '7:00 PM - 9:00 PM',
      location: 'City Hall - Council Chambers',
      category: 'government',
      description: 'Regular meeting of the City Council to discuss local matters and policies.',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Summer Concert Series',
      date: '2024-06-20',
      time: '6:30 PM - 9:30 PM',
      location: 'Community Park Amphitheater',
      category: 'arts',
      description: 'Outdoor concert featuring local bands and musicians. Food trucks will be available.',
      attendees: 350,
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Youth Soccer Tournament',
      date: '2024-06-22',
      time: '9:00 AM - 4:00 PM',
      location: 'Memorial Sports Complex',
      category: 'sports',
      description: 'Annual youth soccer tournament for ages 8-14. Multiple divisions and skill levels.',
      attendees: 200,
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Library Book Sale',
      date: '2024-06-25',
      time: '10:00 AM - 6:00 PM',
      location: 'Public Library - Main Branch',
      category: 'education',
      description: 'Thousands of used books for sale at great prices. Proceeds support library programs.',
      attendees: 85,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'Community Cleanup Day',
      date: '2024-06-29',
      time: '8:30 AM - 12:00 PM',
      location: 'Meet at City Park Entrance',
      category: 'community',
      description: 'Join fellow residents to help clean up our parks and public spaces. Supplies provided.',
      attendees: 65,
      image: 'https://images.unsplash.com/photo-1618477460930-d8bffff64172?w=300&h=200&fit=crop'
    }
  ];

  // Filter events by category
  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  // Format month name
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Navigation functions for calendar
  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  // Get days in month for calendar view
  const getDaysInMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, events: [] });
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === i && 
               eventDate.getMonth() === month && 
               eventDate.getFullYear() === year;
      });
      
      days.push({ day: i, events: dayEvents });
    }
    
    return days;
  };

  // Get category color based on category id
  const getCategoryColor = (category) => {
    switch (category) {
      case 'community':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'government':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'arts':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'sports':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'education':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Render calendar view
  const renderCalendarView = () => {
    const days = getDaysInMonth(currentMonth);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Calendar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={prevMonth}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
          </motion.button>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatMonthYear(currentMonth)}
          </h3>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          {dayNames.map((day, index) => (
            <div key={index} className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {days.map((dayData, index) => (
            <div 
              key={index} 
              className={`min-h-24 p-1 border border-gray-100 dark:border-gray-800 ${
                dayData.day ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
              }`}
            >
              {dayData.day && (
                <div className="h-full">
                  <div className={`text-right p-1 text-sm ${
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayData.day).toDateString() === new Date().toDateString()
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full w-8 h-8 ml-auto flex items-center justify-center'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {dayData.day}
                  </div>
                  
                  <div className="overflow-y-auto max-h-20">
                    {dayData.events.map(event => (
                      <div 
                        key={event.id}
                        className={`text-xs p-1 mb-1 truncate rounded ${getCategoryColor(event.category)}`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render list view of events
  const renderListView = () => (
    <div className="space-y-4">
      {filteredEvents.map(event => (
        <motion.div
          key={event.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="relative">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-40 object-cover"
            />
            <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${getCategoryColor(event.category)}`}>
              {categories.find(c => c.id === event.category)?.label || event.category}
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {event.title}
            </h3>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {event.description}
            </p>
            
            <div className="flex space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                RSVP
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium"
              >
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {cityName} Events Calendar
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover and join local events in your community
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        {/* View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'list'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            List
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('calendar')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'calendar'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Calendar
          </motion.button>
        </div>

        {/* Create Event Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Create Event</span>
        </motion.button>
      </div>

      {/* Categories - Only show in list view */}
      {activeView === 'list' && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map(category => (
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
      )}

      {/* Content */}
      {activeView === 'calendar' ? renderCalendarView() : renderListView()}
    </div>
  );
};

export default EventsCalendar;