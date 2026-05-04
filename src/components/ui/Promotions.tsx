"use client";

import React, { useState, useEffect } from 'react';
import { Megaphone, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GlobalAlert = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="bg-slate-900 text-white h-8 flex items-center overflow-hidden sticky top-0 z-[60] shadow-lg border-b border-white/5">
      <div className="flex items-center gap-2 px-4 bg-indigo-600 h-full shrink-0 z-10">
        <Volume2 size={12} className="animate-pulse" />
        <span className="text-[8px] font-black uppercase tracking-widest whitespace-nowrap">LATEST_UPDATE</span>
      </div>
      <div className="flex-1 whitespace-nowrap overflow-hidden relative">
        <div className="animate-marquee inline-block pl-[100%] text-[10px] font-bold uppercase tracking-widest text-indigo-100 italic">
          {message} • {message}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
};

export const AdSlider = ({ ads }: { ads: Array<{ title: string, desc: string, tag: string }> }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [ads.length]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-900 rounded-[2rem] h-32 md:h-40 text-white shadow-2xl group">
      {ads.map((ad, idx) => (
        <div 
          key={idx}
          className={cn(
            "absolute inset-0 p-6 md:p-8 flex flex-col justify-center transition-all duration-1000",
            idx === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          )}
        >
          <div className="relative z-10">
            <span className="bg-indigo-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest mb-2 inline-block">AD_PROMOTED: {ad.tag}</span>
            <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none mb-1">{ad.title}</h3>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase max-w-[80%] line-clamp-1">{ad.desc}</p>
          </div>
        </div>
      ))}
      
      {/* Dots */}
      <div className="absolute bottom-4 left-8 flex gap-1.5 z-20">
        {ads.map((_, idx) => (
          <div key={idx} className={cn("h-1 rounded-full transition-all", idx === current ? "w-6 bg-indigo-500" : "w-2 bg-white/20")}></div>
        ))}
      </div>

      <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};
