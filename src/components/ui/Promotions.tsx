"use client";

import React, { useState, useEffect } from 'react';
import { Megaphone, Volume2, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GlobalAlert = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="bg-slate-900 text-white h-7 flex items-center overflow-hidden sticky top-0 z-[70] shadow-lg border-b border-white/5">
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

export const TopAdBar = ({ ads }: { ads: Array<{ title: string, tag: string }> }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [ads.length]);

  return (
    <div className="bg-indigo-900 text-white h-6 flex items-center overflow-hidden sticky top-7 z-[65] shadow-sm border-b border-indigo-500/20">
      <div className="flex items-center gap-2 px-3 bg-slate-900 h-full shrink-0">
        <ShoppingBag size={8} className="text-indigo-400" />
        <span className="text-[6px] font-black uppercase tracking-widest text-slate-400">PROMO</span>
      </div>
      <div className="flex-1 px-4 flex items-center justify-center relative h-full">
        {ads.map((ad, idx) => (
          <div 
            key={idx}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-700",
              idx === current ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
          >
            <p className="text-[8px] font-black uppercase tracking-[0.2em] italic">
              <span className="text-indigo-400">{ad.tag}:</span> {ad.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
