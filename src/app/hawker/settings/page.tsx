"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  User, Shield, Bell, Smartphone, 
  MapPin, Phone, Save, LogOut, Camera,
  HelpCircle, ShieldCheck, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HawkerSettings() {
  const [saving, setSaving] = useState(false);

  const handleUpdate = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('HAWKER_PROFILE_UPDATED: Secure update complete.');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="HAWKER" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">FIELD_CONFIG</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">HAWKER_PROFILE</h1>
          </div>
          <button 
            onClick={handleUpdate}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-indigo-600 transition-all"
          >
            <Save size={16} /> SAVE_CHANGES
          </button>
        </header>

        <div className="max-w-4xl space-y-8">
          {/* Main Profile Info */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="w-32 h-32 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-5xl font-black italic shadow-inner border-4 border-white shadow-slate-100">
                R
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-all">
                <Camera size={18} />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight">Ramesh Yadav</h2>
                <span className="flex items-center gap-1 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[8px] font-black uppercase"><ShieldCheck size={10} /> Verified</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">HAWKER_ID: HWK-001 • Agent: Sita Ram Agency</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="px-4 py-2 bg-slate-50 rounded-xl text-[9px] font-black text-slate-500 uppercase border border-slate-100">Deliveries: 1,200+</div>
                <div className="px-4 py-2 bg-slate-50 rounded-xl text-[9px] font-black text-slate-500 uppercase border border-slate-100">Rating: 4.9 ★</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Identity Form */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} /> FIELD_IDENTITY</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase px-2">Primary Phone</p>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input type="tel" defaultValue="+91 98765 43211" className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase px-2">Delivery Area</p>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input type="text" defaultValue="Rohini Sector 4, Delhi" className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Alerts */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Bell size={14} /> ALERTS_&_SECURITY</h3>
              <div className="space-y-3">
                {[
                  { label: 'WhatsApp Notifications', active: true },
                  { label: 'Push Delivery Alerts', active: true },
                  { label: 'Attendance Reminders', active: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-700 uppercase">{item.label}</span>
                    <input type="checkbox" defaultChecked={item.active} className="w-8 h-4 bg-slate-200 rounded-full appearance-none checked:bg-emerald-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-3 after:h-3 after:bg-white after:rounded-full checked:after:left-4.5 after:transition-all" />
                  </div>
                ))}
              </div>
              <button className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                <Shield size={14} /> CHANGE_ACCESS_PIN
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">ACCOUNT_OPERATIONS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:bg-indigo-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-indigo-600"><HelpCircle size={20} /></div>
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">GET_SUPPORT</span>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-all" />
              </button>
              <button className="p-6 bg-rose-50 rounded-[2rem] border border-rose-100 flex items-center justify-between group hover:bg-rose-600 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-rose-500 group-hover:text-rose-600"><LogOut size={20} /></div>
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest group-hover:text-white">SIGNOUT_SECURELY</span>
                </div>
                <ChevronRight size={16} className="text-rose-200 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
