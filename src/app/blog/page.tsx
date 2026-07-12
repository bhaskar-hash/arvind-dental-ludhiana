'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { blogService, BlogPost } from '@/lib/blogService';

export default function BlogListingPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(blogService.getAllPosts());
  }, []);

  const triggerBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  return (
    <div className="bg-luxury-50 min-h-screen py-20 bg-white text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
            Education Center
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl font-display">
            Restorations & Implants Blog
          </h1>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            Read clinical insights, pricing breakdowns, and dental tourism guides written directly by Ludhiana's senior MDS Prosthodontists and Endodontists.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-slate-205 rounded-[2.5rem] overflow-hidden flex flex-col justify-between hover:border-gold-400/20 transition-all luxury-glow"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 text-slate-800 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-slate-200/50 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center text-[10px] text-slate-400 space-x-3 font-light">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 leading-snug group-hover:text-gold-450 font-display">
                    <Link href={`/blog/${post.slug}`} className="hover:text-gold-400 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs text-gold-400 font-bold uppercase tracking-wider flex items-center hover:text-gold-300 font-display"
                  >
                    Read Article
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Consultation CTA */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 text-center space-y-6 max-w-3xl mx-auto luxury-glow">
          <Sparkles className="h-8 w-8 text-gold-400 mx-auto" />
          <h3 className="text-2xl font-bold text-slate-900 font-display">Have Specific Dental Questions?</h3>
          <p className="text-sm text-slate-500 font-light max-w-xl mx-auto">
            Get a clinical opinion on your OPG X-ray from Dr. Arvind Sahu (MDS Prosthodontist) directly. Request an immediate 15-minute callback.
          </p>
          <button
            onClick={triggerBooking}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-8 py-3.5 rounded-full uppercase tracking-widest font-display shadow-lg shadow-blue-500/10 hover:scale-105 active:scale-95 transition-all"
          >
            Request 15-Min Callback
          </button>
        </div>

      </div>
    </div>
  );
}
