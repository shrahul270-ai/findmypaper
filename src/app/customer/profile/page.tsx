"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Settings, Grid, Bookmark, User, Newspaper, Calendar, Wallet, CheckCircle2, MoreHorizontal, Camera, History } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState('POSTS'); // POSTS, SAVED, TAGGED

  const subscriptions = [
    { id: 1, name: 'Dainik Jagran', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=300&h=300&fit=crop', price: 180 },
    { id: 2, name: 'Economic Times', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=300&h=300&fit=crop', price: 250 },
    { id: 3, name: 'India Today', image: 'https://images.unsplash.com/photo-1585829365294-bb752404bb23?q=80&w=300&h=300&fit=crop', price: 60 },
  ];

  return (
    <div className="flex min-h-screen bg-white md:bg-slate-50">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto md:p-8">
          
          {/* Instagram-style Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 p-6 md:p-0 mb-12 border-b md:border-none border-slate-100">
            <div className="relative group">
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-slate-100 p-1 flex items-center justify-center bg-gradient-to-tr from-amber-400 via-fuchsia-500 to-indigo-600">
                <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden border-2 border-white flex items-center justify-center text-slate-400">
                  <User size={64} />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 bg-white border border-slate-200 p-1.5 rounded-full shadow-lg text-indigo-600 hover:scale-110 transition-all">
                <Camera size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-6 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="text-2xl font-light text-slate-900 tracking-tight">rahul_sharma_77</h1>
                <div className="flex gap-2">
                  <button className="bg-slate-900 text-white px-5 py-1.5 rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 transition-all">Edit Profile</button>
                  <button className="bg-slate-100 text-slate-900 px-5 py-1.5 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all">View Archive</button>
                  <button className="p-1.5 text-slate-600"><Settings size={20} /></button>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-8 md:gap-12 py-4 md:py-0 border-y md:border-none border-slate-100">
                <div className="text-center md:text-left"><span className="font-bold text-slate-900">03</span> <span className="text-slate-500 font-medium text-sm">Services</span></div>
                <div className="text-center md:text-left"><span className="font-bold text-slate-900">₹450</span> <span className="text-slate-500 font-medium text-sm">Advance</span></div>
                <div className="text-center md:text-left"><span className="font-bold text-slate-900">124</span> <span className="text-slate-500 font-medium text-sm">Deliveries</span></div>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-sm">Rahul Sharma</p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  📍 Rohini Sector 9, Delhi • Premium Member <br />
                  Digital News & Magazine Enthusiast 📖✨ <br />
                  <span className="text-indigo-600 font-bold">#findmypaper #morningread</span>
                </p>
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-0 scrollbar-hide">
             {[
               { icon: <Wallet size={20} />, label: 'Wallet' },
               { icon: <History size={20} />, label: 'History' },
               { icon: <CheckCircle2 size={20} />, label: 'Verified' },
               { icon: <Newspaper size={20} />, label: 'Daily' },
             ].map((h, i) => (
               <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer">
                   {h.icon}
                 </div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{h.label}</span>
               </div>
             ))}
          </div>

          {/* Tabs Selection */}
          <div className="flex justify-center gap-16 border-t border-slate-200">
            <button 
              onClick={() => setActiveTab('POSTS')}
              className={cn(
                "flex items-center gap-2 py-4 border-t text-[10px] font-black tracking-widest uppercase transition-all",
                activeTab === 'POSTS' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400"
              )}
            >
              <Grid size={12} /> ACTIVE_SERVICES
            </button>
            <button 
              onClick={() => setActiveTab('SAVED')}
              className={cn(
                "flex items-center gap-2 py-4 border-t text-[10px] font-black tracking-widest uppercase transition-all",
                activeTab === 'SAVED' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400"
              )}
            >
              <Bookmark size={12} /> PENDING_ORDERS
            </button>
          </div>

          {/* Grid View */}
          <div className="grid grid-cols-3 gap-1 md:gap-8 p-1 md:p-0 mb-20 animate-fade-in">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="relative aspect-square group overflow-hidden bg-slate-100">
                <img src={sub.image} alt={sub.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white p-4 text-center">
                  <p className="text-[10px] font-black tracking-widest uppercase mb-1">{sub.name}</p>
                  <p className="text-xl font-black italic tracking-tighter">₹{sub.price}/mo</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
