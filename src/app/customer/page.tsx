"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, 
  Bike, MessageSquare, Send, X, BookOpen, Calendar, ArrowRight, 
  ShieldCheck, Wallet, AlertCircle, Smartphone, Info, UserCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function CustomerDashboard() {
  const [showPauseModal, setShowPauseModal] = useState(false);

  const ads = [
    { tag: 'SCHOOL_AD', title: 'ST. STEPHENS ADMISSIONS OPEN - 20% OFF ON NEW REGISTRATION' },
    { tag: 'GYM_OFFER', title: 'GOLD GYM: JOIN NOW & GET 3 MONTHS FREE ON ANNUAL PLAN' },
    { tag: 'GOVT_NOTICE', title: 'WATER CONSERVATION MISSION 2026 - SAVE WATER, SAVE LIFE' },
    { tag: 'PROPERTY_DEAL', title: '2BHK FLATS STARTING AT ₹45 LAKHS IN ROHINI SECTOR 24' },
  ];

  const activeServices = [
    { name: 'The Times of India', type: 'NEWSPAPER', price: 180 },
    { name: 'Pratiyogita Darpan', type: 'MAGAZINE', price: 95 },
  ];

  const leaveDays = [5, 12, 18]; 

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GlobalAlert message="ADMIN_BROADCAST: NEW_YEAR_OFFER! GET 10% OFF ON ALL MAGAZINES. CONTACT YOUR AGENT NOW." />
      <TopAdBar ads={ads} />
      
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar role="CUSTOMER" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1">DASHBOARD_HOME</p>
              <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">HELLO, <span className="text-indigo-600">RAHUL_SHARMA</span></h1>
            </div>
            
            <div className="flex flex-col items-end gap-2">
               <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-emerald-500 uppercase">ADVANCE</p>
                    <p className="text-xl font-black text-slate-800 tracking-tighter">₹450.00</p>
                  </div>
                  <div className="w-px h-8 bg-slate-100"></div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-amber-500 uppercase">PENDING</p>
                    <p className="text-xl font-black text-slate-800 tracking-tighter">₹0.00</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg ml-2">
                    <Wallet size={24} />
                  </div>
               </div>
               <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100">
                  <Info size={12} />
                  <p className="text-[9px] font-bold uppercase tracking-tight">Note: Advanced payment agle month ke bill mein adjust ho jayega.</p>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Newspaper size={18} /></div>
                    <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">ACTIVE_SERVICES</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {activeServices.map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          <p className="text-sm font-black text-slate-800">{s.name}</p>
                        </div>
                        <p className="text-xs font-bold text-slate-400 italic">₹{s.price}/mo</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center bg-indigo-600 p-5 rounded-3xl text-white">
                    <div>
                      <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest">TOTAL_MONTHLY_BILL</p>
                      <p className="text-2xl font-black tracking-tighter">₹275.00</p>
                    </div>
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">VIEW_DETAILS</button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Calendar size={18} /></div>
                    <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">DELIVERY_REPORT: MAY</h2>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div><span className="text-[9px] font-black text-slate-400 uppercase">DELIVERED</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-full"></div><span className="text-[9px] font-black text-slate-400 uppercase">ABSENT/LEAVE</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-7 md:grid-cols-10 gap-2">
                  {[...Array(31)].map((_, i) => {
                    const isLeave = leaveDays.includes(i + 1);
                    const isPast = i + 1 < 12;
                    return (
                      <div key={i} className={cn(
                        "h-14 flex flex-col items-center justify-center rounded-xl text-[10px] font-black border transition-all",
                        isLeave ? "bg-rose-50 text-rose-600 border-rose-100 shadow-sm" : 
                        isPast ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                        "bg-slate-50/50 text-slate-400 border-slate-50"
                      )}>
                        <span>{i + 1}</span>
                        {isLeave && <span className="text-[7px] mt-1 font-black uppercase">ABSENT</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-8 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-slate-200"></div> YOUR_SERVICE_SQUAD
                </h2>
                <div className="space-y-6">
                   <div className="relative group">
                      <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group-hover:bg-indigo-50/50 transition-all">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 border border-slate-200 shrink-0 overflow-hidden">
                           <UserCircle2 size={40} className="text-slate-200" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest mb-1">OFFICIAL_AGENT</p>
                          <p className="text-base font-black text-slate-800 uppercase leading-none mb-2">Sita Ram Agency</p>
                          <div className="flex flex-col gap-1">
                            <a href="tel:9876543210" className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                              <Phone size={10} /> +91 98765 43210
                            </a>
                            <p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                              <MapPin size={10} /> Rohini, Delhi 110085
                            </p>
                          </div>
                        </div>
                      </div>
                   </div>

                   <div className="relative group">
                      <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group-hover:bg-emerald-50/50 transition-all">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 border border-slate-200 shrink-0 overflow-hidden">
                           <Bike size={32} className="text-slate-200" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-1">YOUR_HAWKER</p>
                          <p className="text-base font-black text-slate-800 uppercase leading-none mb-2">Ramesh Yadav</p>
                          <div className="flex flex-col gap-1">
                            <a href="tel:9876543211" className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-emerald-600 transition-colors">
                              <Phone size={10} /> +91 98765 43211
                            </a>
                            <p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                              <MapPin size={10} /> Sector 4 Area
                            </p>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setShowPauseModal(true)}
                  className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:bg-indigo-600 transition-all"
                >
                  REQUEST_LEAVE
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>

      {showPauseModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white max-w-md w-full rounded-[2.5rem] p-10 shadow-2xl relative animate-scale-in">
            <button onClick={() => setShowPauseModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-black text-slate-900 text-center mb-8 uppercase italic tracking-tighter">LEAVE_REQUEST</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase px-2">FROM_DATE</p>
                <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black outline-none" />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase px-2">TO_DATE</p>
                <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black outline-none" />
              </div>
              <textarea placeholder="Reason for leave..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black min-h-[100px] outline-none"></textarea>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl">SUBMIT_REQUEST</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
