'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  link: string;
}

const categories: Category[] = [
  {
    id: 'tshirts',
    name: 'T-Shirts',
    description: 'Essential tees crafted from premium cotton',
    image: '/images/categories/tshirts.jpg',
    productCount: 24,
    link: '/category/tshirts'
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    description: 'Comfortable and stylish hoodies for every occasion',
    image: '/images/categories/hoodies.jpg',
    productCount: 18,
    link: '/category/hoodies'
  },
  {
    id: 'jackets',
    name: 'Jackets',
    description: 'Modern jackets designed for urban lifestyle',
    image: '/images/categories/jackets.jpg',
    productCount: 12,
    link: '/category/jackets'
  }
];

export default function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative overflow-hidden bg-gray-100 aspect-[4/5] cursor-pointer"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold group-hover:text-accent-300 transition-colors duration-300">
                {category.name}
              </h3>
              
              <p className="text-sm text-gray-200 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">
                  {category.productCount} Products
                </span>
                
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-accent-300 font-medium"
                >
                  <span className="text-sm">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </motion.div>
      ))}
    </div>
  );
} 