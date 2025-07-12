import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // City Configuration
      cityName: '',
      isConfigured: false,
      setCityName: (name) => set({ cityName: name, isConfigured: true }),

      // User Management
      user: null,
      userType: 'free', // free, paid, publisher
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, userType: 'free' }),

      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Navigation
      activeTab: 'home',
      setActiveTab: (tab) => set({ activeTab: tab }),

      // AI Assistant
      aiHistory: [],
      addAiQuery: (query, response) => set((state) => ({
        aiHistory: [...state.aiHistory, { query, response, timestamp: Date.now() }]
      })),

      // News
      breakingNews: null,
      setBreakingNews: (news) => set({ breakingNews: news }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Filters
      filters: {
        category: 'all',
        priceRange: [0, 1000000],
        location: 'all',
        dateRange: 'all'
      },
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
    }),
    {
      name: 'community-nexus-storage',
      partialize: (state) => ({
        cityName: state.cityName,
        isConfigured: state.isConfigured,
        user: state.user,
        userType: state.userType,
        isAuthenticated: state.isAuthenticated,
        darkMode: state.darkMode,
        aiHistory: state.aiHistory,
      }),
    }
  )
);

export default useStore;