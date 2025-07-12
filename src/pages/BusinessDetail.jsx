import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiArrowLeft, FiStar, FiMapPin, FiPhone, FiGlobe, FiClock, FiHeart, FiShare2 } = FiIcons;

const BusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock business data - in real app, fetch based on ID
  const business = {
    id: 1,
    name: 'Maria\'s Authentic Mexican',
    category: 'restaurants',
    rating: 4.8,
    reviewCount: 127,
    address: '123 Main Street, Downtown District',
    phone: '(555) 123-4567',
    website: 'mariasrestaurant.com',
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 10:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '10:00 AM - 11:00 PM',
      sunday: '10:00 AM - 9:00 PM'
    },
    description: 'Experience authentic Mexican cuisine prepared with fresh, locally-sourced ingredients and traditional family recipes passed down through generations. Our warm, welcoming atmosphere makes every meal a celebration.',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop'
    ],
    services: [
      'Dine-in',
      'Takeout',
      'Delivery',
      'Catering',
      'Private Events'
    ],
    amenities: [
      'Wheelchair Accessible',
      'Outdoor Seating',
      'Free Wi-Fi',
      'Family Friendly',
      'Parking Available'
    ]
  };

  const reviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2024-01-10',
      text: 'Amazing food and service! The carnitas tacos were incredible and the staff was so friendly. Will definitely be back!'
    },
    {
      id: 2,
      author: 'Mike R.',
      rating: 4,
      date: '2024-01-08',
      text: 'Great authentic Mexican food. The atmosphere is cozy and the portions are generous. Highly recommend the enchiladas!'
    },
    {
      id: 3,
      author: 'Jennifer L.',
      rating: 5,
      date: '2024-01-05',
      text: 'Best Mexican restaurant in town! Fresh ingredients, authentic flavors, and excellent service. The margaritas are perfect too!'
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <SafeIcon key="half" icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <SafeIcon key={`empty-${i}`} icon={FiStar} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
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
          src={business.images[0]}
          alt={business.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
          1 of {business.images.length}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Business Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {business.name}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              business.category === 'restaurants' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {business.category.charAt(0).toUpperCase() + business.category.slice(1)}
            </span>
          </div>

          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center">
              {renderStars(business.rating)}
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {business.rating}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ({business.reviewCount} reviews)
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {business.description}
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{business.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{business.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{business.website}</span>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Hours</h3>
          <div className="space-y-2">
            {Object.entries(business.hours).map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 capitalize">{day}</span>
                <span className="text-gray-600 dark:text-gray-400">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Services</h3>
          <div className="flex flex-wrap gap-2">
            {business.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {business.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">{review.author}</span>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            View All Reviews
          </motion.button>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Business</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Send Message
            </motion.button>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Location</h3>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
            <div className="text-center">
              <SafeIcon icon={FiMapPin} className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">Interactive map would load here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;