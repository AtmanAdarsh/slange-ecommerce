'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Minimalist Tee',
    price: 2499,
    originalPrice: 2999,
    image: '/images/products/classic-tee.jpg',
    category: 'T-Shirts',
    rating: 4.8,
    reviewCount: 127,
    isNew: true
  },
  {
    id: '2',
    name: 'Urban Comfort Hoodie',
    price: 3999,
    image: '/images/products/urban-hoodie.jpg',
    category: 'Hoodies',
    rating: 4.9,
    reviewCount: 89,
    isSale: true
  },
  {
    id: '3',
    name: 'Modern City Jacket',
    price: 5999,
    originalPrice: 6999,
    image: '/images/products/city-jacket.jpg',
    category: 'Jackets',
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: '4',
    name: 'Essential Crew Neck',
    price: 1999,
    image: '/images/products/crew-neck.jpg',
    category: 'T-Shirts',
    rating: 4.6,
    reviewCount: 203
  }
];

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {/* Product Image Container */}
          <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-black text-white text-xs px-2 py-1 font-medium">
                  NEW
                </span>
              )}
              {product.isSale && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 font-medium">
                  SALE
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-medium hover:shadow-large transition-shadow">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-medium hover:shadow-large transition-shadow">
                <ShoppingBag className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Discount Badge */}
            {product.originalPrice && (
              <div className="absolute bottom-3 left-3">
                <span className="bg-red-600 text-white text-xs px-2 py-1 font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviewCount})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 capitalize">
              {product.category}
            </p>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: hoveredProduct === product.id ? 1 : 0,
              y: hoveredProduct === product.id ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
} 