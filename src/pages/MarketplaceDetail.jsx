import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiArrowLeft, FiHeart, FiShare2, FiMapPin, FiClock, FiUser, FiMessageCircle, FiFlag } = FiIcons;

const MarketplaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock listing data - in real app, fetch based on ID
  const listing = {
    id: 1,
    title: '2BR Downtown Apartment',
    price: '$1,200/month',
    category: 'realestate',
    location: 'Downtown District',
    postedAt: '2024-01-15T10:00:00Z',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560448075-bb485b067938?w=400&h=300&fit=crop'
    ],
    description: 'Beautiful 2-bedroom apartment in the heart of downtown. Recently renovated with modern amenities, hardwood floors, and large windows with city views. Walking distance to restaurants, shops, and public transportation.',
    seller: {
      name: 'Property Manager',
      rating: 4.9,
      responseTime: '< 1 hour',
      verifiedSince: '2022'
    },
    details: {
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 850,
      parking: 'Street parking',
      petPolicy: 'Cats allowed',
      lease: '12 months minimum',
      utilities: 'Heat and water included',
      amenities: ['Hardwood floors', 'Dishwasher', 'Laundry in unit', 'Air conditioning']
    },
    isFeatured: true,
    views: 234,
    saved: 18
  };

  const similarListings = [
    {
      id: 2,
      title: 'Cozy Studio Near University',
      price: '$800/month',
      location: 'University Area',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop'
    },
    {
      id: 3,
      title: '1BR Loft in Arts District',
      price: '$950/month',
      location: 'Arts District',
      image: 'https://images.unsplash.com/photo-1560448075-bb485b067938?w=200&h=150&fit=crop'
    }
  ];

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="flex items-center justify-between p-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <SafeIcon icon={FiHeart} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <SafeIcon icon={FiShare2} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
          1 of {listing.images.length}
        </div>
        {listing.isFeatured && (
          <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
            Featured
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Listing Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex-1">
              {listing.title}
            </h1>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {listing.price}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                listing.category === 'realestate' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                Real Estate
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiMapPin} className="w-4 h-4" />
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiClock} className="w-4 h-4" />
              <span>{formatTimeAgo(listing.postedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{listing.views} views</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {listing.description}
          </p>
        </div>

        {/* Key Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Key Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</span>
              <p className="font-medium text-gray-900 dark:text-white">{listing.details.bedrooms}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</span>
              <p className="font-medium text-gray-900 dark:text-white">{listing.details.bathrooms}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Square Feet</span>
              <p className="font-medium text-gray-900 dark:text-white">{listing.details.squareFeet.toLocaleString()} sq ft</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Parking</span>
              <p className="font-medium text-gray-900 dark:text-white">{listing.details.parking}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Pet Policy</span>
              <p className="font-medium text-gray-900 dark:text-white">{listing.details.petPolicy}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Lease</span>
              <p className="font-medium text-gray-900 dark:text-white">{listing.details.lease}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {listing.details.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Seller Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Seller Information</h3>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">{listing.seller.name}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>⭐ {listing.seller.rating}</span>
                <span>•</span>
                <span>Responds in {listing.seller.responseTime}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Verified member since {listing.seller.verifiedSince}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-primary-700"
            >
              <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
              <span>Message Seller</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium"
            >
              View Profile
            </motion.button>
          </div>
        </div>

        {/* Similar Listings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Similar Listings</h3>
          <div className="space-y-3">
            {similarListings.map((similar) => (
              <motion.div
                key={similar.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/marketplace/${similar.id}`)}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
              >
                <img
                  src={similar.image}
                  alt={similar.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{similar.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{similar.location}</p>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">{similar.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Report Listing */}
        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-red-600 text-sm flex items-center space-x-1 mx-auto"
          >
            <SafeIcon icon={FiFlag} className="w-4 h-4" />
            <span>Report this listing</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDetail;