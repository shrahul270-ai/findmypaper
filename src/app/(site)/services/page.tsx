"use client";

import React from 'react';
import { Newspaper, Wallet, Smartphone, ShieldCheck, TrendingUp, Users, Clock, Globe, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  const services = [
    {
      title: 'Digital Distribution',
      desc: 'Complete ERP for newspaper agents to manage hawkers, customers, and daily supplies digitally.',
      icon: Newspaper,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Automated Billing',
      desc: 'One-click pro-rata bill generation for thousands of customers. Automated reminders via WhatsApp.',
      icon: Wallet,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Real-time Tracking',
      desc: 'GPS-enabled attendance and delivery verification for hawkers. Ensure every paper is delivered.',
      icon: Smartphone,
      color: 'bg-violet-50 text-violet-600'
    },
    {
      title: 'Payment Verification',
      desc: 'Dedicated verifier console to audit UPI screenshots and approve payments instantly.',
      icon: ShieldCheck,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'SaaS Analytics',
      desc: 'Rich dashboards for Admins to monitor growth, collection rates, and agent performance.',
      icon: TrendingUp,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      title: 'Marketplace Hub',
      desc: 'Customers can discover and subscribe to new publications and magazines directly.',
      icon: Globe,
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="h-20"></div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="text-center mb-24 space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping"></div>
            <p className="text-indigo-600 text-[10px] font-black tracking-[0.4em] uppercase italic">SOLUTIONS_ARCHIVE</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">CORE_SERVICES</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed uppercase tracking-tight">Digitizing the traditional distribution supply chain with modern SaaS infrastructure.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-slate-50 p-10 rounded-3xl border border-slate-100 group hover:bg-slate-900 hover:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100">
              <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-white transition-all duration-500", s.color)}>
                <s.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-4 group-hover:text-white transition-colors">{s.title.replace(' ', '_')}</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-10 group-hover:text-slate-400 transition-colors">{s.desc}</p>
              <button className="flex items-center gap-3 text-[10px] font-black text-indigo-600 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                LEARN_MORE <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-32 bg-indigo-600 rounded-3xl p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl shadow-indigo-100">
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter max-w-2xl mx-auto">READY TO DIGITIZE YOUR DISTRIBUTION DEPOT?</h2>
            <p className="text-indigo-100 font-bold text-lg max-w-xl mx-auto uppercase tracking-tight">Join 500+ agents across India who have eliminated paperwork using PaperFlow ERP.</p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <button className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all shadow-xl">GET_STARTED_NOW</button>
              <button className="bg-indigo-700 text-white border border-indigo-500 px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-indigo-800 transition-all shadow-xl">VIEW_DEMO_VIDEO</button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px] opacity-10 -ml-48 -mt-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-[120px] opacity-20 -mr-48 -mb-48"></div>
        </div>
      </main>
    </div>
  );
}
