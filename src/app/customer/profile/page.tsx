"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  User, Mail, Phone, MapPin, Shield, Bell, 
  Settings, LogOut, Edit3, UserCircle2, 
  ChevronRight, CheckCircle2, Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function ProfilePage() {
  const ads = [
    { tag: 'SECURITY_TIPS', title: 'ALWAYS VERIFY YOUR HAWKER ID BEFORE CASH PAYMENTS' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GlobalAlert message="PROFILE_SECURITY: YOUR ACCOUNT IS PROTECTED BY ENCRYPTION. UPDATE YOUR ADDRESS FOR BETTER DELIVERY." />
      <TopAdBar ads={ads} />
      
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar role="CUSTOMER" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-52px)]">
          <header className="mb-10">
            <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1">ACCOUNT_SETTINGS</p>
            <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">MY_PROFILE</h1>
          </header>

          <div className="max-w-4xl space-y-8">
            
            {/* Simple User Info Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
               <div className="w-32 h-32 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 shrink-0 border-4 border-white shadow-xl">
                  <UserCircle2 size={64} />
               </div>
               <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h2 className="text-2xl font-black text-slate-900 uppercase italic">Rahul Sharma</h2>
                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[8px] font-black uppercase">VERIFIED_CUST</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">Customer ID: CUST-7701 • Member since May 2024</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                     <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all">
                        <Edit3 size={14} /> EDIT_DETAILS
                     </button>
                     <button className="bg-slate-50 text-slate-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 transition-all">
                        LOGOUT
                     </button>
                  </div>
               </div>
            </div>

            {/* Account Details List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} /> CONTACT_INFORMATION
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Phone</span>
                        <span className="text-xs font-black text-slate-800">+91 98765 43210</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                        <span className="text-xs font-black text-slate-800">rahul@example.com</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> DELIVERY_ADDRESS
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-2xl min-h-[100px]">
                     <p className="text-xs font-black text-slate-800 leading-relaxed uppercase">
                        Flat No. 402, Block C,<br />
                        Sunshine Apartments, Rohini Sector 4,<br />
                        New Delhi - 110085
                     </p>
                  </div>
               </div>
            </div>

            {/* Quick Stats/Settings */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">ACCOUNT_PREFERENCES</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-indigo-50 transition-all cursor-pointer group">
                     <div className="flex items-center gap-3">
                        <Bell size={18} className="text-slate-400 group-hover:text-indigo-600" />
                        <span className="text-[10px] font-black uppercase">Notifications</span>
                     </div>
                     <ChevronRight size={14} className="text-slate-300" />
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-indigo-50 transition-all cursor-pointer group">
                     <div className="flex items-center gap-3">
                        <Shield size={18} className="text-slate-400 group-hover:text-indigo-600" />
                        <span className="text-[10px] font-black uppercase">Security</span>
                     </div>
                     <ChevronRight size={14} className="text-slate-300" />
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-indigo-50 transition-all cursor-pointer group">
                     <div className="flex items-center gap-3">
                        <Settings size={18} className="text-slate-400 group-hover:text-indigo-600" />
                        <span className="text-[10px] font-black uppercase">Preferences</span>
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
