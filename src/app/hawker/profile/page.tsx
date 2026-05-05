"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  User, Mail, Phone, MapPin, Shield, Bell, 
  Settings, LogOut, Edit3, UserCircle2, 
  ChevronRight, CheckCircle2, Bike, Award, Star, Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function HawkerProfilePage() {
  const ads = [
    { tag: 'HAWKER_INFO', title: 'WEEKLY SETTLEMENT IS NOW MANDATORY ON SATURDAYS' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GlobalAlert message="HAWKER_NOTICE: PLEASE UPDATE YOUR DELIVERY ROUTE IF THERE ARE ANY NEW ADDRESSES IN SECTOR 4." />
      <TopAdBar ads={ads} />
      
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar role="HAWKER" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-52px)]">
          <header className="mb-10">
            <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1">PARTNER_PROFILE</p>
            <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">MY_TERMINAL_ID</h1>
          </header>

          <div className="max-w-4xl space-y-8">
            
            {/* Hawker Header Info */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
               <div className="w-32 h-32 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-600 shrink-0 border-4 border-white shadow-xl relative">
                  <UserCircle2 size={64} />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                    <Bike size={16} />
                  </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h2 className="text-2xl font-black text-slate-900 uppercase italic">Ramesh Yadav</h2>
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">GOLD_PARTNER</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">ID: HAWK-9921 • Delivery Route: SECTOR 4, ROHINI</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                     <div className="bg-slate-50 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-black text-slate-800 uppercase">4.9 RATING</span>
                     </div>
                     <div className="bg-slate-50 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                        <Award size={14} className="text-indigo-600" />
                        <span className="text-[10px] font-black text-slate-800 uppercase">1,200+ DELIVERIES</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Account Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} /> PARTNER_CONTACT
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Mobile</span>
                        <span className="text-xs font-black text-slate-800">+91 98765 43211</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned Agency</span>
                        <span className="text-xs font-black text-indigo-600 uppercase">SITA RAM AGENCY</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> DISTRIBUTION_AREA
                  </h3>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 h-full">
                     <p className="text-xs font-black text-slate-800 leading-relaxed uppercase italic">
                        Rohini Sector 4,<br />
                        Area Blocks: A, B, C & D<br />
                        Total Customers: 45
                     </p>
                  </div>
               </div>
            </div>

            {/* Performance & Payout Settings */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">SETTLEMENT_PREFERENCES</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-indigo-50 transition-all border border-slate-100">
                     <div className="flex items-center gap-3">
                        <Wallet size={20} className="text-slate-400 group-hover:text-indigo-600" />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-tight">Payout History</p>
                           <p className="text-[9px] font-bold text-slate-400">View weekly settlements</p>
                        </div>
                     </div>
                     <ChevronRight size={14} className="text-slate-300" />
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-indigo-50 transition-all border border-slate-100">
                     <div className="flex items-center gap-3">
                        <Shield size={20} className="text-slate-400 group-hover:text-indigo-600" />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-tight">Security ID</p>
                           <p className="text-[9px] font-bold text-slate-400">Manage route permissions</p>
                        </div>
                     </div>
                     <ChevronRight size={14} className="text-slate-300" />
                  </div>
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
