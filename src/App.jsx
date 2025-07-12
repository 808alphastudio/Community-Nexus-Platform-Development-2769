import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useStore from './store/useStore';

// Components
import CitySetup from './components/setup/CitySetup';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AIAssistant from './pages/AIAssistant';
import NewsCenter from './pages/NewsCenter';
import CommunityHub from './pages/CommunityHub';
import Marketplace from './pages/Marketplace';
import BusinessDirectory from './pages/BusinessDirectory';
import LocalDeals from './pages/LocalDeals';
import UserProfile from './pages/UserProfile';
import BusinessDetail from './pages/BusinessDetail';
import MarketplaceDetail from './pages/MarketplaceDetail';
import NewsArticle from './pages/NewsArticle';
import Dashboard from './pages/Dashboard';
import EventsCalendar from './pages/EventsCalendar';
import LocalServices from './pages/LocalServices';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

function App() {
  const { isConfigured, darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isConfigured) {
    return <CitySetup />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/news" element={<NewsCenter />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/events" element={<EventsCalendar />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<MarketplaceDetail />} />
            <Route path="/businesses" element={<BusinessDirectory />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route path="/services" element={<LocalServices />} />
            <Route path="/deals" element={<LocalDeals />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;