"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, Bike, MessageSquare, Send, X, BookOpen } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

export default function CustomerDashboard() {
  const [showPauseModal, setShowPauseModal] = useState(false);

  const activeSubscriptions = [
    { name: 'The Times of India', type: 'NEWSPAPER', price: 180 },
    { name: 'Economic Times', type: 'NEWSPAPER', price: 250 },
    { name: 'Pratiyogita Darpan', type: 'BOOKLET', price: 95 },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">CUSTOMER_PORTAL: HOME</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">WELCOME_BACK, RAHUL</h1>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">U{i}</div>
            ))}
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="ACTIVE_SUBSCRIPTIONS" value={activeSubscriptions.length.toString()} icon={CheckCircle2} />
          <StatCard title="CURRENT_BALANCE" value="₹450" icon={Clock} />
          <StatCard title="PAPERS_DELIVERED" value="12" icon={Newspaper} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List of Active Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-black tracking-widest uppercase text-slate-500">CURRENT_ACTIVE_ITEMS</h2>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">UPDATED_TODAY</span>
              </div>
              
              <div className="space-y-4">
                {activeSubscriptions.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-400 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-3 rounded-xl",
                        item.type === 'NEWSPAPER' ? "bg-white text-indigo-600 shadow-sm" : "bg-white text-emerald-600 shadow-sm"
                      )}>
                        {item.type === 'NEWSPAPER' ? <Newspaper size={20} /> : <BookOpen size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{item.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.type} • Monthly Delivery</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-700 tracking-tighter">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowPauseModal(true)}
                className="w-full mt-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold text-xs tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} /> REQUEST_SERVICE_PAUSE (CHUTTI)
              </button>
            </div>
          </div>

          {/* Contacts Section */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">SUPPORT_CHANNELS</h2>
            
            <div className="card border-l-4 border-l-indigo-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600"><Building2 size={20} /></div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Sita Ram Agency</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Main Distributor</p>
                </div>
              </div>
              <a href="tel:9876543210" className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-[10px] tracking-widest uppercase shadow-lg shadow-indigo-100">
                <Phone size={12} /> CALL_AGENT
              </a>
            </div>

            <div className="card border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600"><Bike size={20} /></div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Ramesh Yadav</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Your Hawker</p>
                </div>
              </div>
              <a href="tel:9988776655" className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 text-white rounded-lg font-bold text-[10px] tracking-widest uppercase shadow-lg shadow-emerald-100">
                <Phone size={12} /> CALL_HAWKER
              </a>
            </div>
          </div>
        </div>

        {/* Modal remains the same */}
        {showPauseModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-md w-full rounded-[2.5rem] p-8 shadow-2xl animate-fade-in relative">
              <button onClick={() => setShowPauseModal(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600"><X size={24} /></button>
              <h2 className="text-2xl font-black text-slate-800 text-center mb-6">PAUSE_SERVICE</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold" />
                  <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold" />
                </div>
                <textarea placeholder="Message to Agent..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold min-h-[100px]"></textarea>
                <button type="button" onClick={() => setShowPauseModal(false)} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl shadow-indigo-100">SEND_REQUEST</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
