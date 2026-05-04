"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, Bike, MessageSquare, Send, X, BookOpen, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerDashboard() {
  const [showPauseModal, setShowPauseModal] = useState(false);

  const activeSubscriptions = [
    { name: 'The Times of India', type: 'NEWSPAPER', price: 180, plan: 'Platinum' },
    { name: 'Economic Times', type: 'NEWSPAPER', price: 250, plan: 'Business' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest">PRO_MEMBER</span>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">CUSTOMER_ID: CUST-7701</p>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic">HELLO, <span className="text-indigo-600">RAHUL_SHARMA</span></h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-right px-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase">WALLET_BALANCE</p>
              <p className="text-lg font-black text-slate-800">₹450.00</p>
            </div>
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Clock size={24} />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Hero: Active Subscription Card */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-300 animate-slide-up">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full mb-6 border border-white/10">
                    <ShieldCheck className="text-indigo-400" size={14} />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">VERIFIED_SUBSCRIPTION</span>
                  </div>
                  <h2 className="text-4xl font-black mb-2 tracking-tight">THE_TIMES_OF_INDIA</h2>
                  <p className="text-slate-400 font-medium mb-8 text-sm">Active since Jan 2024 • Daily Morning Delivery (6:00 AM)</p>
                  <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">PLAN_TYPE</p>
                      <p className="text-sm font-black tracking-widest">PLATINUM_PRO</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">MONTHLY_PRICE</p>
                      <p className="text-sm font-black tracking-widest text-indigo-400">₹180 / MO</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <button 
                    onClick={() => setShowPauseModal(true)}
                    className="w-full bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-xl"
                  >
                    MANAGE_HOLIDAYS
                  </button>
                </div>
              </div>
              {/* Decorative Elements */}
              <Newspaper className="absolute -right-10 -bottom-10 w-64 h-64 opacity-[0.03] -rotate-12" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full"></div>
            </div>

            {/* Delivery Tracker: Modern Calendar */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-slide-up delay-100">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Calendar size={18} /></div>
                  <h2 className="text-xs font-black tracking-widest uppercase text-slate-500">DELIVERY_CHRONICLE: MAY_2026</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> <span className="text-[10px] font-bold text-slate-400">ARRIVED</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-slate-100 rounded-full border border-slate-200"></span> <span className="text-[10px] font-bold text-slate-400">PENDING</span></div>
                </div>
              </div>
              <div className="grid grid-cols-7 md:grid-cols-10 gap-3">
                {[...Array(31)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-14 flex flex-col items-center justify-center rounded-2xl text-[10px] font-black transition-all border",
                      i < 12 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:scale-105" 
                        : "bg-slate-50/50 text-slate-300 border-slate-50"
                    )}
                  >
                    <span className="opacity-40">{i + 1}</span>
                    {i < 12 && <CheckCircle2 size={12} className="mt-1" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8 animate-slide-up delay-200">
            
            {/* Contact Hierarchy */}
            <div>
              <h2 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-2">
                <div className="w-4 h-0.5 bg-slate-200"></div> YOUR_SERVICE_SQUAD
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">PRIMARY_AGENT</p>
                      <h3 className="font-black text-slate-800 leading-none">Sita Ram Agency</h3>
                      <p className="text-xs font-bold text-slate-400 mt-1">Rajesh Sharma</p>
                    </div>
                  </div>
                  <a href="tel:9876543210" className="flex items-center justify-center gap-3 w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all">
                    <Phone size={14} /> CALL_SUPPORT
                  </a>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Bike size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">FIELD_HAWKER</p>
                      <h3 className="font-black text-slate-800 leading-none">Ramesh Yadav</h3>
                      <p className="text-xs font-bold text-slate-400 mt-1">Available 05:00 - 10:00 AM</p>
                    </div>
                  </div>
                  <a href="tel:9988776655" className="flex items-center justify-center gap-3 w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-emerald-600 hover:text-white transition-all">
                    <Phone size={14} /> CALL_HAWKER
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="text-lg font-black uppercase mb-2 tracking-tighter italic">EXPAND_CATALOG</h3>
                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-6">Discover more papers & books</p>
                <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:scale-105 transition-all">
                  VISIT_MARKETPLACE <ArrowRight size={14} />
                </button>
              </div>
              <BookOpen className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
            </div>

          </div>
        </div>

        {/* Holiday Modal (Updated Design) */}
        {showPauseModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-md w-full rounded-[3rem] p-10 shadow-2xl animate-scale-in relative">
              <button onClick={() => setShowPauseModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
                <X size={24} />
              </button>
              
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Clock size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">MANAGE_HOLIDAYS</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">Request service pause from agent</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">FROM_DATE</label>
                    <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">TO_DATE</label>
                    <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">REASON_CODE</label>
                  <textarea placeholder="Tell us why you want to pause..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold min-h-[120px] outline-none focus:ring-2 focus:ring-indigo-600"></textarea>
                </div>
                <button className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:bg-indigo-600 transition-all">
                  SUBMIT_APPLICATION
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; scale: 0.95; }
          to { opacity: 1; scale: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
