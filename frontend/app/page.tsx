'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Hero3D from '../components/Hero3D';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryShowcase from '../components/CategoryShowcase';
import NewsletterSignup from '../components/NewsletterSignup';
import InstagramFeed from '../components/InstagramFeed';
import { ShoppingBag, Heart, Star, Truck, Shield, RefreshCw } from 'lucide-react';

// ... rest of the code remains same
export default function HomePage() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Shipping',
      description: 'On orders over ₹2000'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Easy Returns',
      description: '30 day return policy'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Premium Quality',
      description: 'Handpicked materials'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D */}
      <section className="relative h-screen overflow-hidden">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-950 to-primary-900">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-4">SLANGE</h1>
              <p className="text-xl">Loading...</p>
            </div>
          </div>
        }>
          <Hero3D />
        </Suspense>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-soft mb-4 group-hover:shadow-medium transition-all duration-300">
                  <div className="text-primary-600 group-hover:text-primary-800 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Discover our latest pieces crafted with premium materials and timeless design
            </p>
          </motion.div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Explore our curated collections designed for the modern individual
            </p>
          </motion.div>
          <CategoryShowcase />
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              Follow Our Journey
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Get inspired by real people wearing SLANGE in their everyday lives
            </p>
          </motion.div>
          <InstagramFeed />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-primary-950">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
} 
