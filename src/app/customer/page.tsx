"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Calendar, Newspaper, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

export default function CustomerDashboard() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8">
        <header className="mb-8">
          <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">CUSTOMER_PORTAL: HOME</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">WELCOME_BACK, RAHUL</h1>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="SUBSCRIPTION_STATUS" value="ACTIVE" icon={CheckCircle2} />
          <StatCard title="CURRENT_BALANCE" value="₹450" icon={Clock} />
          <StatCard title="PAPERS_DELIVERED" value="12" icon={Newspaper} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Info */}
          <div className="card">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-6 text-slate-500">SUBSCRIPTION_DETAILS</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm"><Newspaper size={18} /></div>
                  <span className="text-xs font-bold text-slate-600">PRIMARY_NEWSPAPER</span>
                </div>
                <span className="text-sm font-black text-slate-800">The Times of India</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm"><MapPin size={18} /></div>
                  <span className="text-xs font-bold text-slate-600">DELIVERY_ADDRESS</span>
                </div>
                <span className="text-xs font-bold text-slate-800 text-right">Flat 402, Green Valley Apartments</span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all">
              PAUSE_SUBSCRIPTION (CHUTTI)
            </button>
          </div>

          {/* Delivery Calendar (Mock) */}
          <div className="card">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-6 text-slate-500">DELIVERY_LOG: MAY_2026</h2>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(31)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-10 flex items-center justify-center rounded-lg text-[10px] font-bold",
                    i < 12 ? "bg-green-100 text-green-700 border border-green-200" : "bg-slate-50 text-slate-300 border border-slate-100"
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full"></span> DELIVERED</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-200 rounded-full"></span> UPCOMING</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Missing CN import fixed here too
import { cn } from '@/lib/utils';
