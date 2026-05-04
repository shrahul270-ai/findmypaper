"use client";

import React, { useState, useEffect } from 'react';
import { Megaphone, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GlobalAlert = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="bg-slate-900 text-white h-7 flex items-center overflow-hidden sticky top-0 z-[60] shadow-lg border-b border-white/5">
      <div className="flex items-center gap-2 px-3 bg-indigo-600 h-full shrink-0 z-10">
        <Volume2 size={10} className="animate-pulse" />
        <span className="text-[7px] font-black uppercase tracking-widest whitespace-nowrap">NEWS</span>
      </div>
      <div className="flex-1 whitespace-nowrap overflow-hidden relative">
        <div className="animate-marquee inline-block pl-[100%] text-[9px] font-bold uppercase tracking-widest text-indigo-100 italic">
          {message} • {message}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 35s linear infinite; }
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
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl h-20 md:h-24 text-white shadow-xl group max-w-lg mx-auto border border-white/5">
      {ads.map((ad, idx) => (
        <div 
          key={idx}
          className={cn(
            "absolute inset-0 p-4 flex flex-col justify-center transition-all duration-1000",
            idx === current ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <div className="relative z-10 text-center">
            <span className="bg-white/10 px-2 py-0.5 rounded-[4px] text-[7px] font-black uppercase tracking-widest mb-1.5 inline-block text-indigo-400">PROMO: {ad.tag}</span>
            <h3 className="text-sm md:text-base font-black italic uppercase tracking-tight leading-none mb-0.5">{ad.title}</h3>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter line-clamp-1">{ad.desc}</p>
          </div>
        </div>
      ))}
      
      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-indigo-500 animate-progress-bar"></div>

      <style jsx>{`
        @keyframes progress { 0% { width: 0; } 100% { width: 100%; } }
        .animate-progress-bar { animation: progress 5s linear infinite; }
      `}</style>
    </div>
  );
};
