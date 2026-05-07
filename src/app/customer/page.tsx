"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, 
  Bike, MessageSquare, Send, X, BookOpen, Calendar, ArrowRight, 
  ShieldCheck, Wallet, AlertCircle, Smartphone, Info, UserCircle2,
  QrCode, MessageCircle, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function CustomerDashboard() {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [complaintSent, setComplaintSent] = useState(false);

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

  const handlePauseToggle = () => {
    const action = !isPaused ? 'PAUSE' : 'RESUME';
    if(confirm(`Are you sure you want to ${action} delivery? Pro-rata adjustments will be applied.`)) {
      setIsPaused(!isPaused);
    }
  };

  const raiseComplaint = () => {
    setComplaintSent(true);
    setTimeout(() => setComplaintSent(false), 3000);
  };

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
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              
              {/* Holiday Mode Card */}
              <div className={cn(
                "p-8 rounded-2xl border transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6",
                isPaused ? "bg-amber-50 border-amber-200" : "bg-white border-slate-100 shadow-sm"
              )}>
                <div className="flex items-center gap-6">
                  <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg", isPaused ? "bg-amber-500 text-white" : "bg-indigo-600 text-white")}>
                    <Calendar size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">HOLIDAY_MODE</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isPaused ? "DELIVERY_PAUSED_UNTIL_MANUAL_RESUME" : "PAUSE_DELIVERY_FOR_PRO_RATA_DISCOUNT"}</p>
                  </div>
                </div>
                <button 
                  onClick={handlePauseToggle}
                  className={cn(
                    "px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-xl active:scale-95",
                    isPaused ? "bg-emerald-600 text-white hover:bg-slate-900" : "bg-slate-900 text-white hover:bg-amber-600"
                  )}
                >
                  {isPaused ? "RESUME_DELIVERY" : "ACTIVATE_HOLIDAY"}
                </button>
              </div>

              {/* Delivery Calendar */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Clock size={18} /></div>
                    <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">DELIVERY_TRACKER: MAY</h2>
                  </div>
                  <div className="flex gap-4 hidden md:flex">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div><span className="text-[9px] font-black text-slate-400 uppercase">DELIVERED</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-full"></div><span className="text-[9px] font-black text-slate-400 uppercase">MISSED</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full"></div><span className="text-[9px] font-black text-slate-400 uppercase">PAUSED</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-7 md:grid-cols-10 gap-2">
                  {[...Array(31)].map((_, i) => {
                    const isLeave = leaveDays.includes(i + 1);
                    const isPast = i + 1 < 12;
                    const dayIsPaused = isPaused && i + 1 >= 11;
                    return (
                      <div key={i} className={cn(
                        "h-14 flex flex-col items-center justify-center rounded-xl text-[10px] font-black border transition-all relative overflow-hidden",
                        dayIsPaused ? "bg-amber-50 text-amber-600 border-amber-100" :
                        isLeave ? "bg-rose-50 text-rose-600 border-rose-100" : 
                        isPast ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                        "bg-slate-50/50 text-slate-400 border-slate-50"
                      )}>
                        <span>{i + 1}</span>
                        {dayIsPaused && <div className="absolute inset-0 flex items-center justify-center bg-amber-500/10"><X size={12} /></div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Raise Complaint & Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><AlertTriangle size={14} className="text-rose-500" /> RAISING_COMPLAINT</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed mb-6">Paper not received or wet? Notify your agent instantly.</p>
                      <button 
                        onClick={raiseComplaint}
                        disabled={complaintSent}
                        className={cn(
                          "w-full py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-lg",
                          complaintSent ? "bg-emerald-100 text-emerald-600" : "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                        )}
                      >
                        {complaintSent ? "COMPLAINT_LOGGED_✓" : "PAPER_NOT_RECEIVED"}
                      </button>
                    </div>
                 </div>

                 <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                       <h3 className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-6 flex items-center gap-2"><QrCode size={14} /> INSTANT_PAY</h3>
                       <p className="text-[10px] font-bold text-indigo-100 uppercase leading-relaxed mb-6 italic tracking-tight">Direct transfer to your official Agent/Depot wallet via UPI.</p>
                       <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-slate-900 hover:text-white transition-all">SCAN_&_PAY_OFFICIAL</button>
                    </div>
                    <QrCode className="absolute -right-10 -bottom-10 w-40 h-40 opacity-10 rotate-12" />
                 </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
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
                          </div>
                        </div>
                        <button onClick={() => window.open(`https://wa.me/919876543211`, '_blank')} className="p-3 bg-white text-emerald-600 rounded-xl shadow-sm border border-slate-100 hover:scale-110 transition-all">
                           <MessageCircle size={20} />
                        </button>
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                 <div className="relative z-10">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 italic">MY_SUBSCRIPTIONS</p>
                    <div className="space-y-4">
                       {activeServices.map((s, i) => (
                         <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                            <span className="text-xs font-black uppercase italic">{s.name}</span>
                            <span className="text-xs font-black text-indigo-400">₹{s.price}</span>
                         </div>
                       ))}
                    </div>
                    <button className="w-full mt-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2">
                       MANAGE_PLAN <ArrowRight size={14} />
                    </button>
                 </div>
                 <Newspaper className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rotate-12" />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
