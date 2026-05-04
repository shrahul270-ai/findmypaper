"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Newspaper, BookOpen, ShoppingBag, Plus, Check, Info, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerMarketplace() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const catalog = [
    { id: 'NP-01', type: 'NEWSPAPER', name: 'Dainik Jagran', price: 180, period: 'Monthly', desc: 'Leading Hindi Daily' },
    { id: 'NP-02', type: 'NEWSPAPER', name: 'Economic Times', price: 250, period: 'Monthly', desc: 'Business & Finance News' },
    { id: 'BK-01', type: 'BOOKLET', name: 'Pratiyogita Darpan', price: 95, period: 'One-time', desc: 'Current Affairs Magazine' },
    { id: 'BK-02', type: 'BOOKLET', name: 'Champak', price: 45, period: 'One-time', desc: 'Kids Monthly Story Book' },
  ];

  const handlePurchase = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      alert("Order Request Sent! Your Agent will confirm and start delivery.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">MARKETPLACE: EXPLORE</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">NEWSPAPERS_&_BOOKLETS</h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2 shadow-sm">
            <ShoppingBag className="text-indigo-600" size={18} />
            <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">ACTIVE_SUBSCRIPTIONS: 1</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalog.map((item) => (
            <div key={item.id} className="card group hover:border-indigo-500 transition-all shadow-xl shadow-slate-100/50 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "p-3 rounded-2xl",
                  item.type === 'NEWSPAPER' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                )}>
                  {item.type === 'NEWSPAPER' ? <Newspaper size={28} /> : <BookOpen size={28} />}
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase px-2 py-1 bg-slate-50 border border-slate-100 rounded text-slate-400">
                  {item.type}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-2">{item.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PRICE</p>
                  <p className="text-2xl font-black text-slate-800">₹{item.price}<span className="text-xs font-bold text-slate-400"> / {item.period}</span></p>
                </div>
                <button 
                  onClick={() => handlePurchase(item.id)}
                  disabled={loadingId === item.id}
                  className="bg-slate-900 text-white px-4 py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg"
                >
                  {loadingId === item.id ? <Loader2 className="animate-spin" size={14} /> : <><Plus size={14} /> SUBSCRIBE</>}
                </button>
              </div>

              {/* Decorative Background Icon */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                {item.type === 'NEWSPAPER' ? <Newspaper size={120} /> : <BookOpen size={120} />}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-indigo-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-200">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Need a customized pack?</h2>
            <p className="text-indigo-100 font-medium">Contact your agent directly to mix and match multiple newspapers and weekly magazines.</p>
          </div>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-slate-900 hover:text-white transition-all shadow-xl">
            CHAT_WITH_AGENT
          </button>
        </div>
      </main>
    </div>
  );
}
