'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ChevronLeft, PhoneCall, Check, MessageSquare } from 'lucide-react';
import { blogService, BlogPost } from '@/lib/blogService';
import { dataService } from '@/lib/dataService';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  useEffect(() => {
    const fetched = blogService.getPostBySlug(unwrappedParams.slug);
    if (!fetched) {
      notFound();
    } else {
      setPost(fetched);
    }
  }, [unwrappedParams.slug]);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim() || !post) return;

    dataService.addAppointment({
      patientName: 'Quick Blog Reader Lead',
      email: 'calculator-lead@ludhianadental.com',
      phone: quickPhone,
      date: new Date().toISOString().split('T')[0],
      time: 'Immediate Callback Requested',
      treatment: `Blog: ${post.title}`,
      message: `Callback requested while reading article: "${post.title}".`,
    });

    setQuickSubmitted(true);
    setQuickPhone('');
  };

  const openWhatsApp = () => {
    if (!post) return;
    const link = dataService.getWhatsAppLink('+918847651364', 'Reader', `Query about article: ${post.title}`);
    window.open(link, '_blank');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-400 font-light">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-20 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 uppercase tracking-wider mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Articles
        </Link>

        {/* Hero Meta */}
        <div className="space-y-4 mb-8">
          <span className="bg-gold-50 text-gold-500 border border-gold-250/20 text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-block">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            {post.title}
          </h1>
          <div className="flex items-center text-xs text-slate-455 space-x-4 font-light pt-2">
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-[2rem] border border-slate-200 mb-12 shadow-md">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div
          className="prose prose-slate max-w-none text-slate-650 font-light leading-relaxed space-y-6 text-sm sm:text-base
            prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-8 prose-headings:mb-4
            prose-h2:text-2xl prose-h3:text-xl
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-strong:font-bold prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Dynamic Contextual Lead Box */}
        <div className="mt-16 bg-slate-50 border border-slate-200/80 p-8 rounded-[2rem] space-y-6 luxury-glow">
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-bold text-slate-900 font-display">Have Questions About This Procedure?</h3>
            <p className="text-xs text-slate-500 font-light">
              Speak directly with Dr. Arvind's receptionist to get a specific quote or verify clinic availability.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {/* Call Form */}
            <div className="flex-1 space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center">
                <PhoneCall className="h-3.5 w-3.5 text-gold-400 mr-1.5" />
                Request callback in 15 Minutes:
              </span>
              
              {!quickSubmitted ? (
                <form onSubmit={handleQuickSubmit} className="flex gap-2">
                  <input
                    type="tel"
                    required
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    placeholder="Enter phone / WhatsApp"
                    className="flex-grow bg-white border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-gold-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all uppercase tracking-widest font-display whitespace-nowrap active:scale-95"
                  >
                    Call Me
                  </button>
                </form>
              ) : (
                <div className="text-xs text-green-600 font-semibold flex items-center bg-green-500/10 p-2.5 rounded-lg border border-green-500/25">
                  <Check className="h-4 w-4 mr-2" />
                  Request logged! We will call you shortly.
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden md:flex items-center justify-center text-slate-300 font-light text-xs">
              OR
            </div>

            {/* WhatsApp */}
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Direct WhatsApp Hotline:
              </span>
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-display transition-all"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
