"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, Bike, MessageSquare, Send, X, BookOpen, Calendar, ArrowRight, ShieldCheck, Wallet, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function CustomerDashboard() {
  const [showPauseModal, setShowPauseModal] = useState(false);

  const ads = [
    { tag: 'SCHOOL_AD', title: 'ST. STEPHENS ADMISSIONS OPEN - 20% OFF' },
    { tag: 'GOVT_NOTICE', title: 'WATER CONSERVATION MISSION 2026' },
  ];

  const activeServices = [
    { name: 'The Times of India', type: 'NEWSPAPER', price: 180 },
    { name: 'Pratiyogita Darpan', type: 'MAGAZINE', price: 95 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bars - Fixed at Top */}
      <GlobalAlert message="ADMIN_BROADCAST: NEW_YEAR_OFFER! GET 10% OFF ON ALL MAGAZINES. CONTACT YOUR AGENT NOW." />
      <TopAdBar ads={ads} />
      
      {/* Main Content Area - Flex Row */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar role="CUSTOMER" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-52px)]">
          <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 animate-fade-in">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-indigo-600 text-white text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase">PRO_MEMBER</span>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">CUST-7701 • RAHUL_SHARMA</p>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 italic uppercase">MY_STATION</h1>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-3 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 w-full lg:w-auto">
              <div className="flex flex-1 justify-around md:justify-end gap-4 md:gap-8 px-2 md:px-6">
                <div className="text-right">
                  <p className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-widest">ADVANCE</p>
                  <p className="text-lg md:text-xl font-black text-slate-800 tracking-tighter">₹450.00</p>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="text-right">
                  <p className="text-[8px] md:text-[9px] font-black text-amber-500 uppercase tracking-widest">PENDING</p>
                  <p className="text-lg md:text-xl font-black text-slate-800 tracking-tighter">₹0.00</p>
                </div>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 shrink-0">
                <Wallet size={24} />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-6 md:p-10 text-white shadow-2xl shadow-slate-300 animate-slide-up">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full mb-6 border border-indigo-500/20">
                    <ShieldCheck size={14} />
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase">ACTIVE_SERVICE</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase italic leading-none">THE_TIMES_OF_INDIA</h2>
                  <div className="space-y-3 mb-10">
                    {activeServices.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-slate-400 font-bold text-xs md:text-sm">
                        <CheckCircle2 className="text-emerald-500" size={16} />
                        <span>{service.type}: <span className="text-white">{service.name}</span></span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
                    <div className="flex gap-4">
                      <div className="bg-white px-5 py-3 md:px-6 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] shadow-xl shadow-black/20">
                        <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">MONTHLY_TOTAL</p>
                        <p className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">₹275.00</p>
                      </div>
                    </div>
                    <button onClick={() => setShowPauseModal(true)} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all text-center">MANAGE_LEAVE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}
