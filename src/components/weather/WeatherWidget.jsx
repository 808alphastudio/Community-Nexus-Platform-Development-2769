import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDroplet, FiWind, FiSun, FiThermometer, FiArrowUp, FiArrowDown, FiClock } = FiIcons;

const WeatherWidget = ({ cityName = 'Your City' }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Simulating API call with mock data
    setTimeout(() => {
      setWeatherData({
        current: {
          temp: 72,
          feels_like: 75,
          humidity: 65,
          wind_speed: 8,
          uv_index: 4,
          weather_condition: 'Partly Cloudy',
          icon: '🌤️',
          updated_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        daily: [
          { day: 'Today', high: 75, low: 64, icon: '🌤️', condition: 'Partly Cloudy', precipitation: 20 },
          { day: 'Tomorrow', high: 78, low: 66, icon: '☀️', condition: 'Sunny', precipitation: 0 },
          { day: 'Wed', high: 82, low: 68, icon: '☀️', condition: 'Sunny', precipitation: 0 },
          { day: 'Thu', high: 77, low: 65, icon: '🌧️', condition: 'Rain', precipitation: 80 },
          { day: 'Fri', high: 73, low: 62, icon: '⛅', condition: 'Mostly Cloudy', precipitation: 30 }
        ],
        hourly: [
          { time: '12 PM', temp: 72, icon: '🌤️', precipitation: 10 },
          { time: '1 PM', temp: 73, icon: '🌤️', precipitation: 10 },
          { time: '2 PM', temp: 74, icon: '🌤️', precipitation: 20 },
          { time: '3 PM', temp: 75, icon: '🌤️', precipitation: 30 },
          { time: '4 PM', temp: 74, icon: '⛅', precipitation: 20 },
          { time: '5 PM', temp: 73, icon: '⛅', precipitation: 10 },
          { time: '6 PM', temp: 71, icon: '⛅', precipitation: 10 },
          { time: '7 PM', temp: 70, icon: '🌙', precipitation: 0 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  // Render loading skeleton
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
        </div>
      </div>
    );
  }

  // If weather data isn't available yet
  if (!weatherData) {
    return null;
  }

  const { current, daily, hourly } = weatherData;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      {/* Current Weather */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {cityName} Weather
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
            Updated {current.updated_at}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{current.temp}°</span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">Feels like {current.feels_like}°</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{current.weather_condition}</p>
          </div>
          <div className="text-5xl">{current.icon}</div>
        </div>
        
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <SafeIcon icon={FiDroplet} className="w-4 h-4 mr-1" />
            <span>Humidity: {current.humidity}%</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <SafeIcon icon={FiWind} className="w-4 h-4 mr-1" />
            <span>Wind: {current.wind_speed} mph</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <SafeIcon icon={FiSun} className="w-4 h-4 mr-1" />
            <span>UV: {current.uv_index}</span>
          </div>
        </div>
      </div>
      
      {/* Expanded View */}
      <AnimatedSection expanded={expanded}>
        {/* Hourly Forecast */}
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Hourly Forecast
          </h4>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {hourly.map((hour, index) => (
              <div key={index} className="flex flex-col items-center min-w-[60px]">
                <span className="text-xs text-gray-500 dark:text-gray-400">{hour.time}</span>
                <span className="text-xl my-1">{hour.icon}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{hour.temp}°</span>
                <span className="text-xs text-blue-500">{hour.precipitation > 0 ? `${hour.precipitation}%` : ''}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 5-Day Forecast */}
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            5-Day Forecast
          </h4>
          <div className="space-y-2">
            {daily.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="w-20 font-medium text-gray-900 dark:text-white">{day.day}</span>
                <div className="flex items-center w-20">
                  <span className="text-xl mr-2">{day.icon}</span>
                  <span className="text-xs text-blue-500">{day.precipitation > 0 ? `${day.precipitation}%` : ''}</span>
                </div>
                <div className="text-right flex items-center w-24">
                  <SafeIcon icon={FiArrowUp} className="w-3 h-3 text-gray-600 dark:text-gray-400 mr-1" />
                  <span className="text-gray-900 dark:text-white">{day.high}°</span>
                  <SafeIcon icon={FiArrowDown} className="w-3 h-3 text-gray-600 dark:text-gray-400 ml-2 mr-1" />
                  <span className="text-gray-600 dark:text-gray-400">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Weather Map Placeholder */}
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Weather Map
          </h4>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-40 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Weather map would display here</span>
          </div>
        </div>
        
        {/* Weather Alerts */}
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <SafeIcon icon={FiAlertTriangle} className="w-4 h-4 text-amber-500 mr-2" />
            Weather Alerts
          </h4>
          <div className="bg-amber-50 dark:bg-amber-900 dark:bg-opacity-20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Flash Flood Watch in effect from Wednesday, 8:00 AM until Wednesday, 8:00 PM.
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-4 pb-4 pt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          Powered by Weather Service • <a href="#" className="underline">Full Forecast</a>
        </div>
      </AnimatedSection>
    </motion.div>
  );
};

// Animated section component for expanding/collapsing content
const AnimatedSection = ({ expanded, children }) => {
  return (
    <motion.div
      initial={false}
      animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden', display: expanded ? 'block' : 'none' }}
    >
      {children}
    </motion.div>
  );
};

// Add missing FiAlertTriangle icon
const { FiAlertTriangle } = FiIcons;

export default WeatherWidget;