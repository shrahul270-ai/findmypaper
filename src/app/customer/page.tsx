"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, Bike, MessageSquare, Send, X, BookOpen, Calendar, ArrowRight, ShieldCheck, Wallet, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerDashboard() {
  const [showPauseModal, setShowPauseModal] = useState(false);

  const activeServices = [
    { name: 'The Times of India', type: 'NEWSPAPER', price: 180 },
    { name: 'Pratiyogita Darpan', type: 'MAGAZINE', price: 95 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase">Member_Account</span>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">CUST-7701 • RAHUL_SHARMA</p>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">CUSTOMER_TERMINAL</h1>
          </div>
          
          {/* Advanced Wallet Section */}
          <div className="flex items-center gap-4 bg-white p-3 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex gap-6 px-4">
              <div className="text-right">
                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">ADVANCE_PAYMENT</p>
                <p className="text-xl font-black text-slate-800 tracking-tighter">₹450.00</p>
              </div>
              <div className="w-px h-10 bg-slate-100"></div>
              <div className="text-right">
                <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">PENDING_DUE</p>
                <p className="text-xl font-black text-slate-800 tracking-tighter">₹0.00</p>
              </div>
            </div>
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Wallet size={28} />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* ACTIVE SERVICE HERO CARD */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-300 animate-slide-up">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full mb-8 border border-indigo-500/20">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase">ACTIVE_SERVICE_STATION</span>
                </div>
                
                <h2 className="text-5xl font-black mb-6 tracking-tight uppercase leading-none italic">
                  {activeServices[0].name} <span className="text-indigo-500">&</span> MORE
                </h2>
                
                <div className="space-y-3 mb-10">
                  {activeServices.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                      <CheckCircle2 className="text-emerald-500" size={16} />
                      <span>{service.type}: <span className="text-white">{service.name}</span></span>
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 ml-7 italic">
                    • AUTO-BILLING: Deducted from advance balance on 1st of every month
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-end justify-between">
                  <div className="flex gap-4">
                    <div className="bg-white px-6 py-4 rounded-[1.5rem] shadow-xl shadow-black/20">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">TOTAL_MONTHLY</p>
                      <p className="text-xl font-black text-slate-900 tracking-tighter">₹275.00</p>
                    </div>
                    <div className="bg-indigo-600 px-6 py-4 rounded-[1.5rem] shadow-xl shadow-indigo-900/40">
                      <p className="text-[9px] font-black text-indigo-200 uppercase mb-1 tracking-widest">NEXT_INVOICE</p>
                      <p className="text-xl font-black text-white tracking-tighter">01_JUN</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowPauseModal(true)}
                    className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-white hover:text-slate-900 transition-all"
                  >
                    REQUEST_PAUSE
                  </button>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 blur-[120px] rounded-full"></div>
              <Newspaper className="absolute -right-12 -bottom-12 w-72 h-72 opacity-[0.03] -rotate-12" />
            </div>

            {/* Delivery Tracker */}
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm animate-slide-up delay-100">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Calendar size={20} /></div>
                  <h2 className="text-xs font-black tracking-widest uppercase text-slate-500">DELIVERY_LOG: MAY_2026</h2>
                </div>
              </div>
              <div className="grid grid-cols-7 md:grid-cols-10 gap-3">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={cn("h-14 flex flex-col items-center justify-center rounded-2xl text-[10px] font-black transition-all border", i < 12 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50/50 text-slate-300 border-slate-50")}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8 animate-slide-up delay-200">
            {/* Service Squad */}
            <div>
              <h2 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-2">
                <div className="w-4 h-0.5 bg-slate-200"></div> YOUR_SERVICE_SQUAD
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all"><Building2 size={24} /></div>
                    <div>
                      <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">AGENT</p>
                      <h3 className="font-black text-slate-800 leading-none">Sita Ram Agency</h3>
                    </div>
                  </div>
                  <a href="tel:9876543210" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] tracking-widest uppercase">CALL_SUPPORT</a>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all"><Bike size={24} /></div>
                    <div>
                      <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">HAWKER</p>
                      <h3 className="font-black text-slate-800 leading-none">Ramesh Yadav</h3>
                    </div>
                  </div>
                  <a href="tel:9988776655" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] tracking-widest uppercase">CALL_HAWKER</a>
                </div>
              </div>
            </div>

            {/* Advance Info Alert */}
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] text-amber-800">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="text-amber-500" size={24} />
                <h3 className="font-black text-sm uppercase tracking-tight">AUTO-PAY_NOTICE</h3>
              </div>
              <p className="text-[11px] font-bold leading-relaxed opacity-80 uppercase tracking-tighter">
                Your current advance balance of <span className="text-amber-600 font-black">₹450.00</span> will be used to pay your upcoming June invoice automatically.
              </p>
            </div>

          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
