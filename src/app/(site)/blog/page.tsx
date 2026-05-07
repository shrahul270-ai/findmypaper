"use client";

import React from 'react';
import { Calendar, User, ArrowRight, Tag, Search, TrendingUp, Newspaper, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const posts = [
  {
    id: 1,
    title: 'How Digital ERPs are Saving Local Newspaper Agencies',
    excerpt: 'Traditional distribution is changing. Discover how agents are using technology to eliminate collection losses.',
    date: '12 May 2024',
    author: 'Admin_Staff',
    category: 'INDUSTRY_INSIGHTS',
    image: '/image/blog1.jpg'
  },
  {
    id: 2,
    title: '5 Tips to Increase Your Monthly Collections by 20%',
    excerpt: 'Automated WhatsApp reminders and multiple payment options are the key to timely payments.',
    date: '08 May 2024',
    author: 'Growth_Manager',
    category: 'AGENT_TIPS',
    image: '/image/blog2.jpg'
  },
  {
    id: 3,
    title: 'The Future of Print Media in the Digital Age',
    excerpt: 'Print is not dead; it is evolving. Learn how the supply chain is becoming more efficient with PaperFlow.',
    date: '01 May 2024',
    author: 'Founder',
    category: 'FUTURE_TECH',
    image: '/image/blog3.jpg'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="h-20"></div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
              <p className="text-indigo-600 text-[10px] font-black tracking-[0.4em] uppercase italic">KNOWLEDGE_BASE</p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">THE_PAPERFLOW CHRONICLE</h1>
            <p className="text-slate-500 font-bold text-lg uppercase tracking-tight">Updates, insights, and stories from the heart of the newspaper distribution world.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="SEARCH_ARTICLES..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black outline-none focus:ring-4 focus:ring-indigo-50 transition-all" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Posts List */}
          <div className="lg:col-span-8 space-y-16">
            {posts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="aspect-[2/1] bg-slate-100 rounded-3xl mb-10 overflow-hidden relative border border-slate-50">
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all duration-700"></div>
                  <div className="absolute top-8 left-8 bg-white px-5 py-2 rounded-xl text-[9px] font-black text-indigo-600 uppercase tracking-widest shadow-xl border border-slate-100 z-10">
                    {post.category}
                  </div>
                  <TrendingUp className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-10 group-hover:scale-110 transition-all duration-1000" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-2"><User size={14} /> BY {post.author}</span>
                  </div>
                  <h2 className="text-4xl font-black italic text-slate-900 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h2>
                  <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-2xl">{post.excerpt}</p>
                  <button className="flex items-center gap-3 text-[10px] font-black text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-all pt-4">
                    READ_FULL_ARTICLE <ArrowRight size={14} className="text-indigo-600" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Categories */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">CATEGORIES</h3>
              <div className="space-y-4">
                {['INDUSTRY_INSIGHTS', 'AGENT_TIPS', 'PRODUCT_UPDATES', 'CASE_STUDIES', 'FUTURE_TECH'].map(cat => (
                  <button key={cat} className="w-full flex items-center justify-between group">
                    <span className="text-xs font-black text-slate-900 uppercase italic group-hover:text-indigo-600 transition-colors">{cat}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">SUBSCRIBE_TO INSIGHTS</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-tight leading-relaxed">Weekly distribution tips and product updates delivered to your inbox.</p>
                <input type="email" placeholder="EMAIL_ADDRESS" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-white" />
                <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-900/50 hover:bg-white hover:text-slate-900 transition-all">JOIN_NEWSLETTER</button>
              </div>
              <Newspaper className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.05] text-indigo-400 rotate-12" />
            </div>

            {/* Trending */}
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 px-4">TRENDING_NOW</h3>
              <div className="space-y-8">
                {[1, 2].map(i => (
                  <div key={i} className="flex gap-4 group cursor-pointer px-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl shrink-0 group-hover:scale-105 transition-all"></div>
                    <div>
                      <p className="text-[8px] font-black text-indigo-600 uppercase mb-1">MAY_2024</p>
                      <h4 className="text-xs font-black text-slate-900 uppercase italic tracking-tight group-hover:text-indigo-600 transition-colors">The Digital Transformation of Distribution</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
