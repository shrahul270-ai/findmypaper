"use client";

import React, { useState } from 'react';
import { Award, CheckCircle2, TrendingUp, DollarSign, Users, ShieldCheck, MapPin, Send, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NewFranchisePage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="h-20"></div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
                <p className="text-indigo-600 text-[10px] font-black tracking-[0.4em] uppercase italic">PARTNERSHIP_STATION</p>
              </div>
              <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">START_YOUR_OWN DISTRIBUTION_HUB</h1>
            </div>
            <p className="text-slate-500 font-bold text-xl leading-relaxed max-w-2xl uppercase tracking-tight">Become a certified PaperFlow ERP partner. Manage newspaper distribution in your city using our state-of-the-art SaaS infrastructure.</p>
            <div className="flex flex-wrap gap-6">
              <div className="bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg"><TrendingUp size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase">HIGH_ROI</p>
                  <p className="text-sm font-black text-slate-900 italic uppercase tracking-tight">Recurrent Revenue</p>
                </div>
              </div>
              <div className="bg-indigo-50 px-6 py-4 rounded-2xl border border-indigo-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg"><ShieldCheck size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase">ZERO_RISK</p>
                  <p className="text-sm font-black text-slate-900 italic uppercase tracking-tight">Verified Tech</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-slate-100 rounded-3xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
               <Award size={300} className="absolute -bottom-10 -right-10 text-indigo-600/10 group-hover:scale-110 transition-all duration-700" />
               <div className="absolute inset-10 flex flex-col justify-end space-y-4">
                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
                     <p className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase mb-1">Franchise_Tier_1</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exclusive City Rights Available</p>
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* Benefits Grid */}
        <section className="mb-32">
          <header className="text-center mb-20">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">WHY_PARTNER_WITH_US?</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Training & Support', desc: 'Complete training for your staff and hawkers on using the ERP.', icon: Award, cls: 'bg-indigo-50 text-indigo-600' },
              { title: 'Marketing Kit', desc: 'Pre-designed pamphlets, banners, and digital ads for your city.', icon: Send, cls: 'bg-emerald-50 text-emerald-600' },
              { title: 'Regional Exclusive', desc: 'One franchise per pin-code cluster to ensure zero internal competition.', icon: MapPin, cls: 'bg-amber-50 text-amber-600' },
              { title: 'Growth Tools', desc: 'Advanced reporting tools to help you scale your customer base.', icon: TrendingUp, cls: 'bg-rose-50 text-rose-600' },
            ].map((b, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm", b.cls)}><b.icon size={24} /></div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-4 leading-none">{b.title}</h3>
                <p className="text-slate-500 font-bold text-xs leading-relaxed uppercase tracking-tight">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Franchise Application Form */}
        <section id="apply" className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 mb-6 leading-tight">SUBMIT_YOUR_APPLICATION</h2>
              <p className="text-slate-500 font-bold text-lg leading-relaxed uppercase tracking-tight">Fill out the form to express your interest. Our partnership team will review your application and reach out for a virtual interview.</p>
            </div>
            <div className="space-y-6">
              {[
                'Review time: 24-48 Hours',
                'Initial Setup: 7 Working Days',
                'Requirements: Local Warehouse/Office',
              ].map((txt, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0"><CheckCircle2 size={14} /></div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{txt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-slate-900 p-10 md:p-16 rounded-3xl text-white shadow-2xl relative overflow-hidden">
               {sent ? (
                 <div className="text-center py-10 animate-in zoom-in">
                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-900/50">
                       <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">APPLICATION_RECEIVED</h3>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">Our expansion manager will contact you shortly.</p>
                    <button onClick={() => setSent(false)} className="mt-10 text-[10px] font-black text-indigo-400 uppercase tracking-widest underline underline-offset-8">BACK_TO_FORM</button>
                 </div>
               ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Your Name</p>
                      <input required type="text" placeholder="FULL_NAME" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-white" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Contact No.</p>
                      <input required type="tel" placeholder="+91 XXXX XXXX" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Target City / Region</p>
                    <input required type="text" placeholder="CITY_NAME" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Current Business (if any)</p>
                    <input type="text" placeholder="COMPANY_NAME" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Investment Capacity</p>
                    <select className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-slate-300 appearance-none uppercase">
                      <option>INR_1-3_LAKH</option>
                      <option>INR_3-7_LAKH</option>
                      <option>INR_7-15_LAKH</option>
                      <option>INR_15+_LAKH</option>
                    </select>
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xs tracking-[0.3em] uppercase shadow-2xl shadow-indigo-900/50 hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 mt-4"
                  >
                    {loading ? <RefreshCw className="animate-spin" size={20} /> : <><Send size={20} /> SUBMIT_PARTNERSHIP_REQUST</>}
                  </button>
                </form>
               )}
               <DollarSign className="absolute -left-10 -bottom-10 w-48 h-48 opacity-[0.05] text-indigo-400 rotate-12" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
