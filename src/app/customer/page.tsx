"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Newspaper, Clock, MapPin, CheckCircle2, Phone, Building2, Bike } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Team & Contacts */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xs font-black tracking-widest uppercase text-slate-400 mb-2">YOUR_DISTRIBUTION_TEAM</h2>
            
            {/* Agent Contact */}
            <div className="card border-l-4 border-l-indigo-600 shadow-xl shadow-indigo-50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                  <Building2 size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">AGENT / AGENCY</p>
                  <h3 className="text-lg font-bold text-slate-800 leading-none">Sita Ram Agency</h3>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">MANAGER:</span>
                  <span className="text-xs font-black text-slate-700">Rajesh Sharma</span>
                </div>
                <a href="tel:9876543210" className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100">
                  <Phone size={14} /> CALL_AGENT
                </a>
              </div>
            </div>

            {/* Hawker Contact */}
            <div className="card border-l-4 border-l-emerald-500 shadow-xl shadow-emerald-50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100">
                  <Bike size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">FIELD_HAWKER</p>
                  <h3 className="text-lg font-bold text-slate-800 leading-none">Ramesh Yadav</h3>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">CONTACT:</span>
                  <span className="text-xs font-black text-slate-700">+91 99887 76655</span>
                </div>
                <a href="tel:9988776655" className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-slate-900 transition-all shadow-lg shadow-emerald-100">
                  <Phone size={14} /> CALL_HAWKER
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Subscription & Calendar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-sm font-bold tracking-widest uppercase mb-6 text-slate-500">SUBSCRIPTION_DETAILS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Newspaper size={18} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-400">PAPER</span>
                  </div>
                  <p className="text-sm font-black text-slate-800">The Times of India</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={18} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-400">ADDRESS</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Flat 402, Green Valley Apartments, Rohini</p>
                </div>
              </div>
              
              <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl font-bold text-xs tracking-widest uppercase hover:border-indigo-600 hover:text-indigo-600 transition-all">
                PAUSE_SERVICE_REQUEST (CHUTTI)
              </button>
            </div>

            {/* Delivery Calendar */}
            <div className="card">
              <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-slate-500">DELIVERY_TRACKER: MAY_2026</h2>
              <div className="grid grid-cols-7 md:grid-cols-10 gap-2">
                {[...Array(31)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-10 flex items-center justify-center rounded-xl text-[10px] font-black",
                      i < 12 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-300 border border-slate-100"
                    )}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-50 pt-4">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> DELIVERED</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-slate-200 rounded-full"></span> UPCOMING</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
