'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  username: string;
  isVideo?: boolean;
}

const instagramPosts: InstagramPost[] = [
  {
    id: '1',
    image: '/images/instagram/post1.jpg',
    likes: 1247,
    comments: 89,
    caption: 'Minimalist style goals ✨ #SLANGE #MinimalistFashion',
    username: '@slange_official'
  },
  {
    id: '2',
    image: '/images/instagram/post2.jpg',
    likes: 892,
    comments: 56,
    caption: 'Urban comfort meets style 🏙️ #UrbanFashion #SLANGE',
    username: '@slange_official'
  },
  {
    id: '3',
    image: '/images/instagram/post3.jpg',
    likes: 1567,
    comments: 123,
    caption: 'Timeless pieces for everyday elegance 💫 #TimelessStyle',
    username: '@slange_official'
  },
  {
    id: '4',
    image: '/images/instagram/post4.jpg',
    likes: 743,
    comments: 45,
    caption: 'Quality that speaks for itself 🎯 #PremiumQuality',
    username: '@slange_official'
  },
  {
    id: '5',
    image: '/images/instagram/post5.jpg',
    likes: 1123,
    comments: 78,
    caption: 'Style simplified, impact amplified 🚀 #SLANGE',
    username: '@slange_official'
  },
  {
    id: '6',
    image: '/images/instagram/post6.jpg',
    likes: 987,
    comments: 67,
    caption: 'Where comfort meets sophistication ✨ #ComfortableLuxury',
    username: '@slange_official'
  }
];

export default function InstagramFeed() {
  return (
    <div className="space-y-8">
      {/* Instagram Handle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <a
          href="https://instagram.com/slange_official"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors"
        >
          <span className="text-lg font-semibold">@slange_official</span>
          <span className="text-sm">Follow us on Instagram</span>
        </a>
      </motion.div>

      {/* Instagram Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {instagramPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
          >
            {/* Post Image */}
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay with Stats */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
                
                <button className="bg-white text-black px-3 py-1 text-xs font-medium hover:bg-gray-100 transition-colors">
                  View Post
                </button>
              </div>
            </div>

            {/* Video Indicator */}
            {post.isVideo && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Follow Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <a
          href="https://instagram.com/slange_official"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <span>Follow @slange_official</span>
          <Share className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  );
} 