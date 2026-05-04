"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Newspaper, BookOpen, ShoppingBag, Plus, Info, Loader2, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerMarketplace() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const catalog = [
    { id: 'NP-01', type: 'NEWSPAPER', name: 'Dainik Jagran', price: 180, period: 'Monthly', desc: 'Leading Hindi Daily' },
    { id: 'NP-02', type: 'NEWSPAPER', name: 'Economic Times', price: 250, period: 'Monthly', desc: 'Business & Finance News' },
    { id: 'BK-01', type: 'BOOKLET', name: 'Pratiyogita Darpan', price: 95, period: 'One-time', desc: 'Current Affairs Magazine' },
    { id: 'BK-02', type: 'BOOKLET', name: 'Champak', price: 45, period: 'One-time', desc: 'Kids Monthly Story Book' },
    { id: 'NP-03', type: 'NEWSPAPER', name: 'Times of India', price: 220, period: 'Monthly', desc: 'India\'s No. 1 English Daily' },
    { id: 'BK-03', type: 'BOOKLET', name: 'India Today', price: 60, period: 'One-time', desc: 'Weekly News Magazine' },
  ];

  const handlePurchase = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      alert("Subscription Request Sent Successfully! Agent will confirm soon.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8 overflow-hidden flex flex-col">
        <header className="mb-12 flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              <p className="text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase">MARKETPLACE_LIVE</p>
            </div>
            <h1 className="text-4xl font-black tracking-tighter italic">CATALOG_STATION</h1>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-3xl flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ACTIVE_FEEDS</p>
              <p className="text-xl font-black text-indigo-400">06_ITEMS</p>
            </div>
            <ShoppingBag className="text-indigo-500" size={32} />
          </div>
        </header>

        <div className="flex-1 relative">
          {/* Vertical Scrolling Wall */}
          <div className="absolute inset-0 overflow-hidden mask-fade-y">
            <div className="animate-vertical-scroll space-y-6 py-10">
              {/* Double the list for seamless loop */}
              {[...catalog, ...catalog].map((item, i) => (
                <div key={`${item.id}-${i}`} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between group hover:bg-indigo-600 transition-all duration-500 cursor-pointer">
                  <div className="flex items-center gap-8">
                    <div className={cn(
                      "w-20 h-20 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110",
                      item.type === 'NEWSPAPER' ? "bg-indigo-500/20 text-indigo-400 group-hover:bg-white/20 group-hover:text-white" : "bg-emerald-500/20 text-emerald-400 group-hover:bg-white/20 group-hover:text-white"
                    )}>
                      {item.type === 'NEWSPAPER' ? <Newspaper size={40} /> : <BookOpen size={40} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest group-hover:text-white/60">{item.type}</span>
                        <TrendingUp size={12} className="text-slate-600 group-hover:text-white/40" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-white">{item.name}</h3>
                      <p className="text-xs text-slate-500 font-bold group-hover:text-white/70">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-500 uppercase group-hover:text-white/60">PRICING</p>
                      <p className="text-3xl font-black group-hover:text-white">₹{item.price}<span className="text-xs opacity-40"> / {item.period}</span></p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePurchase(item.id); }}
                      disabled={loadingId === item.id}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-2xl shadow-indigo-900/50 group-hover:bg-white group-hover:text-indigo-600 transition-all active:scale-95"
                    >
                      {loadingId === item.id ? <Loader2 className="animate-spin" size={18} /> : "SUBSCRIBE"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual Overlays */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 30s linear infinite;
        }
        .animate-vertical-scroll:hover {
          animation-play-state: paused;
        }
        .mask-fade-y {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </div>
  );
}
