"use client";

import React from 'react';
import { Target, Users, ShieldCheck, Globe, Rocket, Award, CheckCircle2, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="h-20"></div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Mission Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-32">
          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="text-indigo-600 text-[10px] font-black tracking-[0.4em] uppercase italic mb-4">OUR_MISSION_STMT</p>
              <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">ELIMINATING_PAPERWORK FOR THE FUTURE</h1>
            </div>
            <p className="text-slate-500 font-bold text-xl leading-relaxed max-w-2xl uppercase tracking-tight">PaperFlow was born out of a simple observation: the newspaper industry, while informative, is managed on thousands of manual ledgers. We're here to change that.</p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              {[
                { val: '1M+', label: 'Monthly Transactions' },
                { val: '500+', label: 'Active Agencies' },
                { val: '50K+', label: 'Happy Customers' },
                { val: '15+', label: 'Major Publications' },
              ].map((s, i) => (
                <div key={i} className="border-l-4 border-indigo-600 pl-6">
                  <p className="text-4xl font-black italic text-slate-900 tracking-tighter mb-1">{s.val}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square bg-slate-100 rounded-3xl flex items-center justify-center p-12 relative overflow-hidden group">
              <Rocket size={200} className="text-indigo-600/10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-50"></div>
              <div className="absolute top-10 right-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 animate-bounce">
                <Target size={32} className="text-indigo-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-32">
          <header className="text-center mb-20 space-y-4">
            <p className="text-indigo-600 text-[10px] font-black tracking-[0.4em] uppercase italic">CORE_DNA</p>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">WHAT DRIVES US</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Transparency', desc: 'No more hidden fees or manual calculation errors. Every transaction is audited.', icon: ShieldCheck, cls: 'bg-indigo-50 text-indigo-600' },
              { title: 'Accessibility', desc: 'Interfaces designed for field hawkers, ensuring zero friction in technology adoption.', icon: Smartphone, cls: 'bg-emerald-50 text-emerald-600' },
              { title: 'Innovation', desc: 'Constantly evolving our billing algorithms to support pro-rata and custom schedules.', icon: Rocket, cls: 'bg-rose-50 text-rose-600' },
            ].map((v, i) => (
              <div key={i} className="bg-slate-50 p-12 rounded-3xl border border-slate-100 text-center">
                <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8", v.cls)}>
                  <v.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-4">{v.title}</h3>
                <p className="text-slate-500 font-bold text-sm leading-relaxed uppercase tracking-tight">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Journey/Timeline */}
        <section className="bg-slate-900 rounded-3xl p-12 md:p-24 text-white relative overflow-hidden">
          <div className="relative z-10">
            <header className="mb-20">
              <p className="text-indigo-400 text-[10px] font-black tracking-[0.4em] uppercase italic mb-4">OUR_EVOLUTION</p>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">THE JOURNEY_SO_FAR</h2>
            </header>
            <div className="space-y-16">
              {[
                { year: '2022', title: 'Conceptualization', desc: 'Started as a small script to help one local agency in Delhi manage bills.' },
                { year: '2023', title: 'SaaS Launch', desc: 'Platform opened for all agents in NCR. 100+ agents joined in the first 3 months.' },
                { year: '2024', title: 'National Expansion', desc: 'Currently expanding across major cities in India with custom publication support.' },
              ].map((t, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 items-start">
                  <span className="text-6xl font-black italic text-indigo-500 tracking-tighter leading-none">{t.year}</span>
                  <div className="pt-2">
                    <h4 className="text-2xl font-black uppercase italic tracking-tight mb-2">{t.title}</h4>
                    <p className="text-slate-400 font-bold text-lg max-w-xl">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px] opacity-10 -mr-48 -mt-48"></div>
        </section>
      </main>
    </div>
  );
}
