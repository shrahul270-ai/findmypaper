"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  User, Shield, Bell, Smartphone, 
  ShieldCheck, ArrowRight, Save, LogOut,
  HelpCircle, ChevronRight, Lock, Eye, EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VerifierSettings() {
  const [saving, setSaving] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('VERIFIER_PROFILE_UPDATED: Security protocols refreshed.');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="VERIFIER" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">AUDIT_STATION</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">VERIFIER_CONFIG</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-indigo-600 transition-all"
          >
            <Save size={16} /> {saving ? 'REFRESHING...' : 'SAVE_SETTINGS'}
          </button>
        </header>

        <div className="max-w-5xl space-y-8">
          
          {/* Profile Section */}
          <div className="bg-white border border-slate-100 rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden group">
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="w-32 h-32 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-5xl font-black italic shadow-2xl shadow-indigo-100 group-hover:rotate-6 transition-all duration-500">
                R
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Rahul Sharma</h2>
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[8px] font-black uppercase flex items-center gap-1"><ShieldCheck size={10} /> Authorized</span>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Staff ID: VER_9921 • Audit Access Level: Tier-1</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <button className="bg-slate-50 text-slate-400 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all border border-slate-100">CHANGE_PHOTO</button>
                  <button className="bg-slate-50 text-slate-400 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100 flex items-center gap-2">
                    <LogOut size={14} /> SIGN_OUT
                  </button>
                </div>
              </div>
            </div>
            <ShieldCheck className="absolute -right-12 -bottom-12 w-48 h-48 opacity-[0.03] text-indigo-600 rotate-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Identity Form */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} /> AUDITOR_IDENTITY</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase px-2">Audit Email</p>
                  <input type="email" defaultValue="rahul.audit@findmypaper.com" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase px-2">Secure Access Pin</p>
                  <div className="relative">
                    <input type={showPin ? "text" : "password"} defaultValue="998821" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                    <button onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900">
                      {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Preferences */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Bell size={14} /> AUDIT_NOTIFICATIONS</h3>
              <div className="space-y-4">
                {[
                  { title: 'New Payment Alert', desc: 'Real-time alert for incoming screenshots', active: true },
                  { title: 'WhatsApp Logs', desc: 'Summary of verified payments to WhatsApp', active: true },
                  { title: 'Security Auth', desc: 'WhatsApp OTP for every audit session', active: false },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-all">
                    <div>
                      <p className="text-[10px] font-black text-slate-900 uppercase">{item.title}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked={item.active} className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-indigo-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-3 after:h-3 after:bg-white after:rounded-full checked:after:left-6 after:transition-all" />
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'AUDIT_LOGS', icon: Shield, cls: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
              { label: 'GET_HELP', icon: HelpCircle, cls: 'bg-slate-50 text-slate-400 border-slate-100' },
              { label: 'DEVICE_LIST', icon: Smartphone, cls: 'bg-slate-50 text-slate-400 border-slate-100' },
            ].map((a, i) => (
              <button key={i} className={cn("p-6 rounded-[2rem] border flex items-center justify-between group transition-all", a.cls)}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><a.icon size={20} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{a.label}</span>
                </div>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
