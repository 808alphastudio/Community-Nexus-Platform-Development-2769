import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMap, FiLayers, FiZoomIn, FiZoomOut, FiCrosshair, FiSearch, FiFilter } = FiIcons;

const CommunityMap = () => {
  const [activeLayer, setActiveLayer] = useState('standard');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    businesses: true,
    events: true,
    services: true,
    publicFacilities: true,
    transportation: false
  });

  // Layer options for map
  const layers = [
    { id: 'standard', label: 'Standard' },
    { id: 'satellite', label: 'Satellite' },
    { id: 'transit', label: 'Transit' },
    { id: 'traffic', label: 'Traffic' }
  ];

  // Toggle a filter
  const toggleFilter = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter]
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <SafeIcon icon={FiMap} className="w-5 h-5 mr-2" />
            Community Map
          </h3>
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg ${
                showFilters 
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <SafeIcon icon={FiFilter} className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <SafeIcon icon={FiCrosshair} className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          />
          <input
            type="text"
            placeholder="Search locations, businesses, or events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Filters Section */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
        className="border-b border-gray-200 dark:border-gray-700"
      >
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Show on Map:</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(filters).map(([key, value]) => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter(key)}
                className={`flex items-center px-3 py-2 rounded-lg border ${
                  value 
                    ? 'bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <div className={`w-4 h-4 mr-2 rounded-sm border ${
                  value 
                    ? 'bg-primary-500 border-primary-500 dark:bg-primary-400 dark:border-primary-400' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {value && (
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Map Container */}
      <div className="relative">
        <div className="w-full h-80 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          {/* Placeholder for actual map that would be integrated here */}
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-600 dark:text-gray-400">Interactive map would display here</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Showing {Object.values(filters).filter(Boolean).length} categories of locations
            </p>
          </div>
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <SafeIcon icon={FiZoomIn} className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <SafeIcon icon={FiZoomOut} className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Layer Controls */}
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-2">
            <SafeIcon icon={FiLayers} className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <div className="flex overflow-x-auto py-2 space-x-1">
              {layers.map(layer => (
                <motion.button
                  key={layer.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                    activeLayer === layer.id
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {layer.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Map data © Community Nexus</span>
          <a href="#" className="underline">Terms of Use</a>
        </div>
      </div>
    </div>
  );
};

export default CommunityMap;