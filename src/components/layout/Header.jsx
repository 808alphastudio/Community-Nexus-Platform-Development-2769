import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import useStore from '../../store/useStore';

const { FiSearch, FiBell, FiUser, FiSun, FiMoon } = FiIcons;

const Header = () => {
  const { cityName, darkMode, toggleDarkMode, isAuthenticated } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 rounded-lg w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {cityName} Nexus
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <SafeIcon 
                icon={darkMode ? FiSun : FiMoon} 
                className="w-5 h-5 text-gray-600 dark:text-gray-300" 
              />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 relative"
            >
              <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full"></div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;