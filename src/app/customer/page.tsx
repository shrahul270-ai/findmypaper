"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, Bike, MessageSquare, Send, X } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

export default function CustomerDashboard() {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setShowPauseModal(false);
      setRequestSent(false);
      alert("Request Sent! Your Agent will review and pause the service.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8">
        <header className="mb-8">
          <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">CUSTOMER_PORTAL: HOME</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">WELCOME_BACK, RAHUL</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="SUBSCRIPTION_STATUS" value="ACTIVE" icon={CheckCircle2} />
          <StatCard title="CURRENT_BALANCE" value="₹450" icon={Clock} />
          <StatCard title="PAPERS_DELIVERED" value="12" icon={Newspaper} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Team */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">YOUR_DISTRIBUTION_TEAM</h2>
            <div className="card border-l-4 border-l-indigo-600 shadow-xl shadow-indigo-50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><Building2 size={24} /></div>
                <div>
                  <h3 className="font-bold text-slate-800">Sita Ram Agency</h3>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Main Agent</p>
                </div>
              </div>
              <a href="tel:9876543210" className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100">
                <Phone size={14} /> CALL_AGENT
              </a>
            </div>

            {/* Hawker Contact */}
            <div className="card border-l-4 border-l-emerald-500 shadow-xl shadow-emerald-50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600"><Bike size={24} /></div>
                <div>
                  <h3 className="font-bold text-slate-800">Ramesh Yadav</h3>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Your Hawker</p>
                </div>
              </div>
              <a href="tel:9988776655" className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-lg shadow-emerald-100">
                <Phone size={14} /> CALL_HAWKER
              </a>
            </div>
          </div>

          {/* Subscription & Pause Request */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500">SUBSCRIPTION_DETAILS</h2>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Billed until 30 May</span>
              </div>
              
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-indigo-600"><Newspaper size={24} /></div>
                  <div>
                    <p className="text-lg font-black text-slate-800 leading-none">The Times of India</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">DAILY_DELIVERY_@_FLAT_402</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-slate-800">₹450/mo</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowPauseModal(true)}
                className="w-full py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold text-xs tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} /> REQUEST_SERVICE_PAUSE (CHUTTI)
              </button>
            </div>

            {/* Calendar */}
            <div className="card">
              <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-slate-500">DELIVERY_TRACKER: MAY_2026</h2>
              <div className="grid grid-cols-7 md:grid-cols-10 gap-2">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={cn("h-10 flex items-center justify-center rounded-xl text-[10px] font-black", i < 12 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-300 border border-slate-100")}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pause Request Modal */}
        {showPauseModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-md w-full rounded-[2.5rem] p-8 shadow-2xl animate-fade-in relative">
              <button onClick={() => setShowPauseModal(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600">
                <X size={24} />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-800">PAUSE_SERVICE</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Send request to your distribution agent</p>
              </div>

              <form onSubmit={handleSendRequest} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1 text-center">FROM_DATE</label>
                    <input type="date" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-indigo-600 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1 text-center">TO_DATE</label>
                    <input type="date" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-indigo-600 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">REASON / MESSAGE</label>
                  <textarea 
                    placeholder="E.g. Going out of station for 5 days..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-indigo-600 outline-none min-h-[120px]"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={requestSent}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 hover:opacity-90 transition-all"
                >
                  {requestSent ? <Clock className="animate-spin" size={18} /> : <><Send size={16} /> SEND_REQUEST_TO_AGENT</>}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
