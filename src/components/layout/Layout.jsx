import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import BreakingNewsBar from '../news/BreakingNewsBar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <BreakingNewsBar />
      <main className="pb-20 pt-16">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;