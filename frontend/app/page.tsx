'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, useRef } from 'react';
import { ShoppingBag, Heart, Star, Truck, Shield, RefreshCw, Menu, Search, User, ShoppingCart, ChevronDown, Instagram, Twitter, Facebook } from 'lucide-react';

// Import components
import Hero3D from '../components/Hero3D';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryShowcase from '../components/CategoryShowcase';
import NewsletterSignup from '../components/NewsletterSignup';
import InstagramFeed from '../components/InstagramFeed';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container-max">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <h1 className="text-3xl font-bold text-gray-900 tracking-wider">SLANGE</h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              <a href="#shop" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium">Shop</a>
              <a href="#collections" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium">Collections</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium">Contact</a>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              <button className="p-3 text-gray-700 hover:text-gray-900 transition-colors duration-300 rounded-full hover:bg-gray-100">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-3 text-gray-700 hover:text-gray-900 transition-colors duration-300 rounded-full hover:bg-gray-100">
                <User className="w-5 h-5" />
              </button>
              <button className="p-3 text-gray-700 hover:text-gray-900 transition-colors duration-300 rounded-full hover:bg-gray-100 relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">3</span>
              </button>
              <button className="p-3 text-gray-700 hover:text-gray-900 transition-colors duration-300 rounded-full hover:bg-gray-100 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">2</span>
              </button>
              <button className="lg:hidden p-3 text-gray-700 hover:text-gray-900 transition-colors duration-300 rounded-full hover:bg-gray-100">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white"></div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 border border-gray-400"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-gray-400"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-gray-400"></div>
          </div>
          
          <div className="relative z-10 container-max">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center lg:text-left space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <h1 className="text-hero text-gray-900 leading-tight">
                    SLANGE
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    Style, Simplified. We create timeless pieces for the modern wardrobe. Quality and design, without compromise.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <button className="btn-primary">
                    Explore Collection
                  </button>
                  <button className="btn-secondary">
                    View Lookbook
                  </button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="pt-8"
                >
                  <div className="flex flex-col items-center lg:items-start space-y-2">
                    <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right 3D Viewer */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                <Suspense fallback={
                  <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-3xl shadow-2xl"></div>
                }>
                  <Hero3D />
                </Suspense>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Features */}
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-max">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                  <Truck className="w-10 h-10 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Shipping</h3>
                <p className="text-gray-600 leading-relaxed">On orders over ₹2000</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                  <Shield className="w-10 h-10 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Payment</h3>
                <p className="text-gray-600 leading-relaxed">100% secure checkout</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                  <RefreshCw className="w-10 h-10 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Returns</h3>
                <p className="text-gray-600 leading-relaxed">30 day return policy</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="shop" className="section-padding bg-gray-50">
          <div className="container-max">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-section text-gray-900 mb-6">Featured Collection</h2>
              <p className="text-body max-w-3xl mx-auto">
                Discover our latest pieces that define modern luxury and timeless elegance. Each piece is crafted with attention to detail and premium materials.
              </p>
            </motion.div>
            <FeaturedProducts />
          </div>
        </section>

        {/* Categories */}
        <section id="collections" className="section-padding bg-white">
          <div className="container-max">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-section text-gray-900 mb-6">Shop by Category</h2>
              <p className="text-body max-w-3xl mx-auto">
                Explore our curated collections designed for the modern lifestyle. From casual essentials to statement pieces, find your perfect style.
              </p>
            </motion.div>
            <CategoryShowcase />
          </div>
        </section>

        {/* Newsletter */}
        <section className="section-padding bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20"></div>
          </div>
          
          <div className="relative z-10 container-max text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-section text-white mb-6">Stay Updated</h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Be the first to know about new collections, exclusive offers, and fashion insights. Join our community of style enthusiasts.
              </p>
              <NewsletterSignup />
            </motion.div>
          </div>
        </section>

        {/* Instagram Feed */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-section text-gray-900 mb-6">Follow Our Journey</h2>
              <p className="text-body max-w-3xl mx-auto">
                Get inspired by our latest looks and behind-the-scenes moments. Follow us for daily style inspiration and exclusive content.
              </p>
            </motion.div>
            <InstagramFeed />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-20">
          <div className="container-max">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
              
              {/* Brand Section */}
              <div className="lg:col-span-1 md:col-span-2">
                <h3 className="text-3xl font-bold mb-6 tracking-wider">SLANGE</h3>
                <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                  Style, Simplified. Creating timeless pieces for the modern wardrobe with uncompromising quality and contemporary design.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Shop Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Shop</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">New Arrivals</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Best Sellers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Sale</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Collections</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Limited Edition</a></li>
                </ul>
              </div>
              
              {/* Support Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Size Guide</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Shipping Info</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Returns & Exchanges</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
                </ul>
              </div>
              
              {/* Company Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Our Story</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Press</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Sustainability</a></li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Footer */}
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400">&copy; 2024 SLANGE. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
