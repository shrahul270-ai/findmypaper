"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, Clock, CheckCircle2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
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
      {/* Header Space */}
      <div className="h-20"></div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                <p className="text-indigo-600 text-xs font-black tracking-[0.3em] uppercase">CONTACT_STATION</p>
              </div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 mb-6 leading-tight">GET_IN_TOUCH WITH OUR TEAM</h1>
              <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-md">Whether you are a customer, agent, or looking for a franchise, we are here to help you digitize your distribution.</p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Helpline', val: '+91 99887 76655', sub: 'Available 9AM - 8PM IST', color: 'bg-indigo-50 text-indigo-600' },
                { icon: Mail, label: 'Email Support', val: 'hello@findmypaper.com', sub: '24/7 Response Time', color: 'bg-emerald-50 text-emerald-600' },
                { icon: MapPin, label: 'Headquarters', val: 'Plot 42, Sector 18, Gurugram', sub: 'Haryana, India - 122015', color: 'bg-amber-50 text-amber-600' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all group-hover:scale-110", item.color)}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xl font-black text-slate-900 italic tracking-tight">{item.val}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-slate-100 flex gap-4">
              <button className="flex items-center gap-3 px-6 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl shadow-emerald-100 hover:bg-slate-900 transition-all">
                <MessageCircle size={18} /> WHATSAPP_NOW
              </button>
              <button className="flex items-center justify-center w-14 h-14 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-indigo-600 transition-all">
                <Globe size={20} />
              </button>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 p-10 md:p-16 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-100 relative overflow-hidden">
              {sent ? (
                <div className="text-center py-20 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-50">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter mb-4">MESSAGE_TRANSMITTED</h2>
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Our team will contact you within 4 business hours.</p>
                  <button onClick={() => setSent(false)} className="mt-10 text-[10px] font-black text-indigo-600 uppercase underline tracking-[0.2em]">SEND_ANOTHER_MSG</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Your Name</label>
                      <input required type="text" placeholder="FULL_NAME" className="w-full px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Contact No.</label>
                      <input required type="tel" placeholder="+91 XXXX XXXX" className="w-full px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Inquiry Type</label>
                    <select className="w-full px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-100 transition-all appearance-none uppercase">
                      <option>CUSTOMER_SUPPORT</option>
                      <option>AGENT_PARTNERSHIP</option>
                      <option>NEW_FRANCHISE</option>
                      <option>OTHER_INQUIRY</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Message</label>
                    <textarea required rows={5} placeholder="TELL US HOW WE CAN HELP..." className="w-full px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-black italic outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none"></textarea>
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs tracking-[0.3em] uppercase shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="animate-spin" size={20} /> : <><Send size={20} /> TRANSMIT_ENQUIRY</>}
                  </button>
                </form>
              )}
              <Clock className="absolute -left-10 -bottom-10 w-48 h-48 opacity-[0.03] text-indigo-600 rotate-12" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
