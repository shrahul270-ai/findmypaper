"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, 
  Bike, MessageSquare, Send, X, BookOpen, Calendar, ArrowRight, 
  ShieldCheck, Wallet, AlertCircle, Smartphone, SmartphoneIcon, CreditCard 
} from 'lucide-react';
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

  // UPI Deep Link Logic
  const upiLink = "upi://pay?pa=sitaramagency@upi&pn=SitaRamAgency&am=275&cu=INR";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GlobalAlert message="ADMIN_BROADCAST: NEW_YEAR_OFFER! GET 10% OFF ON ALL MAGAZINES. CONTACT YOUR AGENT NOW." />
      <TopAdBar ads={ads} />
      
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar role="CUSTOMER" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-52px)]">
          <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1">DASHBOARD_HOME</p>
              <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">HELLO, <span className="text-indigo-600">RAHUL_SHARMA</span></h1>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-emerald-500 uppercase">ADVANCE</p>
                    <p className="text-xl font-black text-slate-800 tracking-tighter">₹450.00</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Wallet size={24} />
                  </div>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Service Widget */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Newspaper size={18} /></div>
                      <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">ACTIVE_SERVICES</h2>
                    </div>
                    <div className="space-y-3 mb-8">
                      {activeServices.map((s, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          <p className="text-sm font-black text-slate-800">{s.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-slate-400 uppercase">TOTAL_MONTHLY</p>
                      <p className="text-lg font-black text-slate-900 tracking-tighter">₹275.00</p>
                    </div>
                  </div>
                  <Newspaper className="absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.02] -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                </div>

                {/* Quick Payment Widget with UPI Deep Link */}
                <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 bg-white/20 rounded-xl"><Smartphone size={18} /></div>
                      <h2 className="text-xs font-black tracking-widest uppercase text-indigo-200">QUICK_PAYMENT</h2>
                    </div>
                    <p className="text-2xl font-black tracking-tighter mb-2 uppercase italic leading-none">CLICK_TO_PAY</p>
                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-8 leading-relaxed">Instantly open PhonePe, GPay or Paytm for 1-click payment.</p>
                    
                    <a 
                      href={upiLink}
                      className="flex items-center justify-center gap-3 bg-white text-indigo-600 w-full py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:scale-105 transition-all"
                    >
                      <SmartphoneIcon size={16} /> OPEN_UPI_APPS
                    </a>
                  </div>
                  <CreditCard className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 rotate-12" />
                </div>
              </div>

              {/* Delivery Log */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Calendar size={18} /></div>
                    <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">DELIVERY_LOG: MAY</h2>
                  </div>
                </div>
                <div className="grid grid-cols-7 md:grid-cols-10 gap-2">
                  {[...Array(31)].map((_, i) => (
                    <div key={i} className={cn("h-10 flex items-center justify-center rounded-xl text-[10px] font-black border", i < 12 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50/50 text-slate-400 border-slate-50")}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-8 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-slate-200"></div> YOUR_SQUAD
                </h2>
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 border border-slate-100"><Building2 size={24} /></div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase">AGENT</p>
                        <p className="text-sm font-black text-slate-800 uppercase">Sita Ram Agency</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 border border-slate-100"><Bike size={24} /></div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase">HAWKER</p>
                        <p className="text-sm font-black text-slate-800 uppercase">Ramesh Yadav</p>
                      </div>
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setShowPauseModal(true)}
                className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:bg-indigo-600 transition-all"
              >
                REQUEST_CHUTTI
              </button>
            </div>
          </div>
        </main>
      </div>

      {showPauseModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white max-w-md w-full rounded-[2.5rem] p-10 shadow-2xl relative animate-scale-in">
            <button onClick={() => setShowPauseModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-900 text-center mb-8 uppercase italic tracking-tighter">MANAGE_LEAVE</h2>
            <div className="space-y-4">
              <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black outline-none" />
              <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black outline-none" />
              <textarea placeholder="Reason..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black min-h-[100px] outline-none"></textarea>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl">SUBMIT_REQUEST</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
