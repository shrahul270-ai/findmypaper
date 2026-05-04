"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Newspaper, BookOpen, ShoppingBag, Plus, Check, Info, ArrowRight, Loader2, Star, MessageCircle, Phone, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerMarketplace() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [subscribedIds, setSubscribedIds] = useState<string[]>([]);

  const catalog = [
    { id: 'NP-01', type: 'NEWSPAPER', name: 'Dainik Jagran', price: 180, period: 'Monthly', desc: 'Leading Hindi Daily in India', star: true },
    { id: 'NP-02', type: 'NEWSPAPER', name: 'Economic Times', price: 250, period: 'Monthly', desc: 'Financial & Corporate Insights', star: false },
    { id: 'BK-01', type: 'BOOKLET', name: 'Pratiyogita Darpan', price: 95, period: 'One-time', desc: 'Current Affairs & Govt Exams', star: true },
    { id: 'BK-02', type: 'BOOKLET', name: 'Champak', price: 45, period: 'One-time', desc: 'Children Monthly Stories', star: false },
    { id: 'NP-03', type: 'NEWSPAPER', name: 'Times of India', price: 220, period: 'Monthly', desc: 'International News & Local Updates', star: true },
    { id: 'BK-03', type: 'BOOKLET', name: 'India Today', price: 60, period: 'One-time', desc: 'Political & Social Analysis', star: false },
  ];

  const handleSubscribe = (id: string) => {
    setLoadingId(id);
    // Real-world: await api.subscribe(id);
    setTimeout(() => {
      setLoadingId(null);
      setSubscribedIds([...subscribedIds, id]);
      alert("SUCCESS: Subscription Request Sent to Agent!");
    }, 1200);
  };

  const handleSupport = () => {
    window.location.href = "tel:9876543210";
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8 flex flex-col h-screen">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div>
              <p className="text-indigo-600 text-[10px] font-black tracking-[0.3em] uppercase">MARKETPLACE_CATALOG</p>
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 italic">NEWSPAPERS_&_<span className="text-indigo-600">BOOKLETS</span></h1>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search catalog..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold outline-none shadow-sm focus:ring-2 focus:ring-indigo-600 transition-all" />
            </div>
            <button className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </header>

        {/* Categories Tabs - Active Buttons */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {['ALL', 'NEWSPAPER', 'BOOKLET', 'MAGAZINES'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap",
                activeTab === cat ? "bg-slate-900 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-50 hover:border-indigo-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog List with Auto-Scrolling Wall */}
        <div className="flex-1 relative overflow-hidden mask-fade-y">
          <div className="animate-vertical-scroll space-y-4 py-6">
            {[...catalog, ...catalog].map((item, i) => (
              <div key={`${item.id}-${i}`} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between group hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 cursor-default">
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                    item.type === 'NEWSPAPER' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {item.type === 'NEWSPAPER' ? <Newspaper size={32} /> : <BookOpen size={32} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {item.star && <Star size={12} className="text-amber-400 fill-amber-400" />}
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.type}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{item.name}</h3>
                    <p className="text-xs text-slate-400 font-bold italic">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PRICING</p>
                    <p className="text-2xl font-black text-slate-800 tracking-tighter">₹{item.price}<span className="text-xs font-bold text-slate-400">/{item.period}</span></p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleSubscribe(item.id)}
                      disabled={loadingId === item.id || subscribedIds.includes(item.id)}
                      className={cn(
                        "px-8 py-3.5 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-lg active:scale-95",
                        subscribedIds.includes(item.id) 
                          ? "bg-emerald-500 text-white shadow-emerald-100" 
                          : "bg-indigo-600 text-white shadow-indigo-100 hover:bg-slate-900"
                      )}
                    >
                      {loadingId === item.id ? <Loader2 className="animate-spin" size={16} /> : (
                        subscribedIds.includes(item.id) ? <Check size={16} /> : "SUBSCRIBE"
                      )}
                    </button>
                    <button className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100">
                      <Info size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Footer with Active Buttons */}
        <div className="mt-8 bg-slate-900 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">NEED_HELP_WITH_CATALOG?</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Our distribution experts are active 24/7</p>
          </div>
          <div className="flex gap-3 relative z-10">
            <button onClick={handleSupport} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-indigo-600 transition-all shadow-xl shadow-indigo-900/50">
              <MessageCircle size={14} /> CHAT_ON_WHATSAPP
            </button>
            <button onClick={handleSupport} className="flex items-center gap-2 bg-white/10 border border-white/10 text-white px-6 py-3.5 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-slate-900 transition-all">
              <Phone size={14} /> CALL_DEPOT
            </button>
          </div>
          <Star className="absolute -right-10 -bottom-10 w-40 h-40 opacity-5 text-white rotate-12" />
        </div>
      </main>

      <style jsx global>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 40s linear infinite;
        }
        .animate-vertical-scroll:hover {
          animation-play-state: paused;
        }
        .mask-fade-y {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
