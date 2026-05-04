"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, Bike, MessageSquare, Send, X, BookOpen, Calendar, ArrowRight, ShieldCheck, Wallet, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAlert, AdBanner } from '@/components/ui/Promotions';

export default function CustomerDashboard() {
  const [showPauseModal, setShowPauseModal] = useState(false);

  const activeServices = [
    { name: 'The Times of India', type: 'NEWSPAPER', price: 180 },
    { name: 'Pratiyogita Darpan', type: 'MAGAZINE', price: 95 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col md:flex-row">
      <GlobalAlert message="ADMIN_BROADCAST: NEW_YEAR_OFFER! GET 10% OFF ON ALL MAGAZINES. CONTACT YOUR AGENT." />
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-600 text-white text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase">PRO_MEMBER</span>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none">CUST-7701 • RAHUL_SHARMA</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 italic uppercase leading-none">MY_STATION</h1>
          </div>
          
          {/* Mobile Friendly Wallet */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            
            {/* AD BANNER: SCHOOL/GOVT ADS */}
            <AdBanner 
              tag="SCHOOL_AD"
              title="ST. STEPHENS INTERNATIONAL ADMISSIONS OPEN!"
              desc="Experience world-class education for your children. Flat 20% discount on first-month fee for PaperFlow users."
            />

            {/* ACTIVE SERVICE HERO */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white shadow-2xl shadow-slate-300 animate-slide-up">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full mb-6 border border-indigo-500/20">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase">ACTIVE_SERVICE</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight uppercase leading-none italic">
                  THE_TIMES_OF_INDIA
                </h2>
                
                <div className="space-y-3 mb-8 md:mb-10">
                  {activeServices.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-400 font-bold text-xs md:text-sm">
                      <CheckCircle2 className="text-emerald-500" size={16} />
                      <span>{service.type}: <span className="text-white">{service.name}</span></span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
                  <div className="flex gap-3 md:gap-4">
                    <div className="bg-white px-5 py-3 md:px-6 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] shadow-xl shadow-black/20">
                      <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">MONTHLY_TOTAL</p>
                      <p className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">₹275.00</p>
                    </div>
                    <div className="bg-indigo-600 px-5 py-3 md:px-6 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] shadow-xl shadow-indigo-900/40">
                      <p className="text-[8px] md:text-[9px] font-black text-indigo-200 uppercase mb-1 tracking-widest">NEXT_BILL</p>
                      <p className="text-lg md:text-xl font-black text-white tracking-tighter">01_JUN</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowPauseModal(true)}
                    className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-black text-[10px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-slate-900 transition-all text-center"
                  >
                    PAUSE_SERVICE
                  </button>
                </div>
              </div>
            </div>

            {/* AD BANNER: GOVT AD */}
            <AdBanner 
              tag="GOVT_NOTICE"
              title="STAY SAFE: WATER CONSERVATION MISSION 2026"
              desc="Save every drop for a better future. A government initiative for environmental protection."
            />
          </div>

          <div className="lg:col-span-4 space-y-6 md:space-y-8 animate-slide-up delay-200">
            {/* Delivery Tracker */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
              <h2 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-2">
                <div className="w-4 h-0.5 bg-slate-200"></div> DELIVERY_CALENDAR
              </h2>
              <div className="grid grid-cols-7 gap-2 md:gap-3">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={cn("h-8 md:h-10 flex items-center justify-center rounded-xl text-[9px] font-black border", i < 12 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50/50 text-slate-300 border-slate-50")}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Service Squad */}
            <div className="space-y-4">
               <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><Building2 size={20} /></div>
                    <div>
                      <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">PRIMARY_AGENT</p>
                      <h3 className="font-black text-slate-800 text-sm leading-none">Sita Ram Agency</h3>
                    </div>
                  </div>
                  <a href="tel:9876543210" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[9px] tracking-widest uppercase">CALL_AGENT</a>
                </div>
            </div>

          </div>
        </div>
      </main>

      {/* Modal remains hidden and responsive */}
      {showPauseModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white max-w-md w-full rounded-[2.5rem] p-6 md:p-10 shadow-2xl animate-scale-in relative">
            <button onClick={() => setShowPauseModal(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-900 text-center mb-6">PAUSE_SERVICE</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-bold outline-none" />
                <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-bold outline-none" />
              </div>
              <textarea placeholder="Reason..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-bold min-h-[100px] outline-none"></textarea>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl">SUBMIT_REQUEST</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
