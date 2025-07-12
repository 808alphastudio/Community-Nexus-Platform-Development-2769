import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';

const { FiAlertTriangle, FiX, FiAlertCircle, FiInfo } = FiIcons;

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'emergency',
      title: 'Flash Flood Warning',
      message: 'Flash flood warning in effect until 8:00 PM. Avoid low-lying areas and do not drive through flooded roads.',
      time: '2 hours ago',
      link: '/alerts/flood',
      unread: true
    },
    {
      id: 2,
      type: 'alert',
      title: 'Road Closure',
      message: 'Main Street between Oak and Elm will be closed for construction from 9 AM to 4 PM today. Please use alternate routes.',
      time: '4 hours ago',
      link: '/alerts/road-closure',
      unread: true
    }
  ]);

  const [expandedAlertId, setExpandedAlertId] = useState(null);

  // Function to dismiss an alert
  const dismissAlert = (id, e) => {
    e.stopPropagation();
    setAlerts(alerts.filter(alert => alert.id !== id));
    if (expandedAlertId === id) {
      setExpandedAlertId(null);
    }
  };

  // Function to mark alert as read
  const markAsRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, unread: false } : alert
    ));
  };

  // Toggle expanded state of an alert
  const toggleAlert = (id) => {
    markAsRead(id);
    setExpandedAlertId(expandedAlertId === id ? null : id);
  };

  // Get icon based on alert type
  const getAlertIcon = (type) => {
    switch (type) {
      case 'emergency':
        return FiAlertTriangle;
      case 'alert':
        return FiAlertCircle;
      default:
        return FiInfo;
    }
  };

  // Get color based on alert type
  const getAlertColor = (type) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-500 dark:bg-red-600';
      case 'alert':
        return 'bg-amber-500 dark:bg-amber-600';
      default:
        return 'bg-blue-500 dark:bg-blue-600';
    }
  };

  // If no alerts, don't render anything
  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 w-full max-w-sm space-y-2">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={`${getAlertColor(alert.type)} rounded-lg shadow-lg overflow-hidden text-white`}
          >
            <div 
              className="flex items-start p-4 cursor-pointer"
              onClick={() => toggleAlert(alert.id)}
            >
              <div className="flex-shrink-0 mr-3">
                <SafeIcon icon={getAlertIcon(alert.type)} className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">
                    {alert.title}
                    {alert.unread && (
                      <span className="ml-2 bg-white bg-opacity-20 text-white text-xs px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </h3>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => dismissAlert(alert.id, e)}
                    className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {(expandedAlertId === alert.id || alert.unread) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mt-1 text-sm text-white text-opacity-90">
                        {alert.message}
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-white text-opacity-75">
                          {alert.time}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="text-sm underline text-white text-opacity-90 hover:text-opacity-100"
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmergencyAlerts;