"use client";

import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Newspaper, BookOpen, ShoppingBag, Plus, Check, Info, ArrowRight, Loader2, Star, MessageCircle, Phone, Search, Filter, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerMarketplace() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const catalog = [
    { id: 'NP-01', type: 'NEWSPAPER', name: 'Dainik Jagran', price: 180, period: 'Monthly', desc: 'Leading Hindi Daily in India', star: true },
    { id: 'NP-02', type: 'NEWSPAPER', name: 'Economic Times', price: 250, period: 'Monthly', desc: 'Financial & Corporate Insights', star: false },
    { id: 'BK-01', type: 'BOOKLET', name: 'Pratiyogita Darpan', price: 95, period: 'One-time', desc: 'Current Affairs & Govt Exams', star: true },
    { id: 'BK-02', type: 'BOOKLET', name: 'Champak', price: 45, period: 'One-time', desc: 'Children Monthly Stories', star: false },
  ];

  const filteredCatalog = useMemo(() => {
    return catalog.filter(item => {
      const matchesTab = activeTab === 'ALL' || item.type === activeTab;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleSubscribe = (id: string) => {
    setLoadingId(id);
    // Notification logic for Agent/Hawker would be here
    setTimeout(() => {
      setLoadingId(null);
      setPendingIds([...pendingIds, id]);
      alert("REQUEST_SENT: Your Agent & Hawker have been notified. Activation pending for 24 hours.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8 flex flex-col h-screen overflow-hidden">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div>
              <p className="text-indigo-600 text-[10px] font-black tracking-[0.3em] uppercase">CATALOG_STATION</p>
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 italic uppercase">MARKETPLACE</h1>
          </div>
          <div className="bg-indigo-600 px-6 py-3 rounded-2xl text-white shadow-xl shadow-indigo-100 flex items-center gap-3">
            <ShoppingBag size={20} />
            <span className="text-xs font-black tracking-widest uppercase">My_Pending_Requests: {pendingIds.length}</span>
          </div>
        </header>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {['ALL', 'NEWSPAPER', 'BOOKLET'].map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)} className={cn("px-8 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all shadow-sm border", activeTab === cat ? "bg-slate-900 text-white border-slate-900 shadow-xl" : "bg-white text-slate-400 border-slate-100")}>{cat}</button>
          ))}
        </div>

        <div className="flex-1 relative overflow-hidden mask-fade-y">
          <div className="animate-vertical-scroll space-y-4 py-6">
            {[...filteredCatalog, ...filteredCatalog].map((item, i) => (
              <div key={`${item.id}-${i}`} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between group hover:border-indigo-600 transition-all duration-500">
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-all", item.type === 'NEWSPAPER' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600")}>
                    {item.type === 'NEWSPAPER' ? <Newspaper size={32} /> : <BookOpen size={32} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{item.name}</h3>
                    <p className="text-xs text-slate-400 font-bold italic">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-800 tracking-tighter">₹{item.price}<span className="text-xs font-bold text-slate-400">/{item.period}</span></p>
                  </div>
                  
                  <button 
                    onClick={() => handleSubscribe(item.id)}
                    disabled={loadingId === item.id || pendingIds.includes(item.id)}
                    className={cn(
                      "px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2",
                      pendingIds.includes(item.id) 
                        ? "bg-amber-100 text-amber-600 border border-amber-200" 
                        : "bg-indigo-600 text-white shadow-indigo-100 hover:bg-slate-900"
                    )}
                  >
                    {loadingId === item.id ? <Loader2 className="animate-spin" size={16} /> : (
                      pendingIds.includes(item.id) ? <><Clock size={16} /> PENDING_24H</> : "SUBSCRIBE"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes vertical-scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-vertical-scroll { animation: vertical-scroll 40s linear infinite; }
        .animate-vertical-scroll:hover { animation-play-state: paused; }
        .mask-fade-y { mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent); }
      `}</style>
    </div>
  );
}
