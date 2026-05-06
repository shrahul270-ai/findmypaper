"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, Shield, Bell, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

export default function VerifierSettings() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar role="VERIFIER" />
      <main className="flex-1 p-4 md:p-10 max-w-4xl mx-auto w-full">
        <header className="mb-10">
          <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1 italic">Control_Panel</p>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 italic tracking-tighter uppercase">PROFILE_SETTINGS</h1>
        </header>

        <div className="space-y-8">
           {/* Profile Section */}
           <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-10 shadow-sm relative overflow-hidden group">
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                 <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black italic shadow-2xl shadow-indigo-100 group-hover:rotate-6 transition-all duration-500">R</div>
                 <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-black text-slate-900 italic uppercase">Rahul Sharma</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Verifier_ID: VER_9921</p>
                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                       <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:scale-105 transition-all">EDIT_AVATAR</button>
                       <button className="border border-slate-200 text-slate-400 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-slate-50 transition-all">UPDATE_BIO</button>
                    </div>
                 </div>
              </div>
              <ShieldCheck className="absolute -right-12 -bottom-12 w-48 h-48 opacity-5 text-indigo-600 rotate-12" />
           </div>

           {/* Preferences Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all">
                 <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-amber-100"><Shield size={24}/></div>
                 <h3 className="text-sm font-black text-slate-900 uppercase italic mb-2">Two-Factor_Auth</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Secure your account with WhatsApp OTP for every login attempt.</p>
                 <button className="mt-6 text-[10px] font-black text-indigo-600 uppercase flex items-center gap-2">MANAGE_SECURITY <ArrowRight size={14}/></button>
              </div>

              <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all">
                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100"><Bell size={24}/></div>
                 <h3 className="text-sm font-black text-slate-900 uppercase italic mb-2">Audit_Notifications</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Receive real-time alerts on WhatsApp when a new payment is logged.</p>
                 <button className="mt-6 text-[10px] font-black text-indigo-600 uppercase flex items-center gap-2">NOTIFICATION_PREFS <ArrowRight size={14}/></button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
