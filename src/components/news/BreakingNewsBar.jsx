import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import useStore from '../../store/useStore';

const { FiAlertTriangle, FiX } = FiIcons;

const BreakingNewsBar = () => {
  const { breakingNews, setBreakingNews } = useStore();

  if (!breakingNews) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-danger text-white px-4 py-3 mt-16"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <span className="font-semibold text-sm">BREAKING:</span>
            <span className="ml-2 text-sm">{breakingNews}</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setBreakingNews(null)}
          className="p-1 hover:bg-red-600 rounded"
        >
          <SafeIcon icon={FiX} className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BreakingNewsBar;