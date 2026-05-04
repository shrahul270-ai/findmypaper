"use client";

import React from 'react';
import { Megaphone, X } from 'lucide-react';

export const GlobalAlert = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-between sticky top-0 z-[60] animate-fade-in shadow-xl shadow-indigo-200">
      <div className="flex items-center gap-3 mx-auto">
        <Megaphone size={16} className="animate-bounce" />
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{message}</p>
      </div>
    </div>
  );
};

export const AdBanner = ({ title, desc, tag }: { title: string, desc: string, tag: string }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-[2rem] p-8 text-white relative overflow-hidden group cursor-pointer shadow-2xl shadow-indigo-100">
      <div className="relative z-10 max-w-[70%]">
        <span className="bg-white/10 border border-white/20 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest mb-3 inline-block">AD_PROMOTED: {tag}</span>
        <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter mb-2 leading-none">{title}</h3>
        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase leading-relaxed">{desc}</p>
        <button className="mt-6 bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-all">VISIT_NOW</button>
      </div>
      {/* Abstract Design Elements */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-4 text-white/5 font-black text-8xl italic uppercase select-none group-hover:text-white/10 transition-all">{tag}</div>
    </div>
  );
};
