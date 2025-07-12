import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiHome, FiMessageCircle, FiNewspaper, FiUsers, FiShoppingBag, FiGrid, FiCalendar, FiMap } = FiIcons;

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: FiHome, label: 'Home', path: '/' },
    { id: 'dashboard', icon: FiGrid, label: 'Dashboard', path: '/dashboard' },
    { id: 'ai', icon: FiMessageCircle, label: 'Ask AI', path: '/ai-assistant' },
    { id: 'news', icon: FiNewspaper, label: 'News', path: '/news' },
    { id: 'events', icon: FiCalendar, label: 'Events', path: '/events' },
    { id: 'community', icon: FiUsers, label: 'Community', path: '/community' },
    { id: 'marketplace', icon: FiShoppingBag, label: 'Market', path: '/marketplace' },
    { id: 'services', icon: FiMap, label: 'Services', path: '/services' },
  ];

  // Display only the first 5 items to fit on mobile
  const visibleNavItems = navItems.slice(0, 5);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="grid grid-cols-5 py-2">
        {visibleNavItems.map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-2 px-1 ${
              isActive(item.path)
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <SafeIcon 
              icon={item.icon} 
              className={`w-6 h-6 mb-1 ${
                isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : ''
              }`} 
            />
            <span className="text-xs font-medium">{item.label}</span>
            {isActive(item.path) && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-600 rounded-full"
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;