"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Settings, User, Lock, Bell, Shield, 
  Store, MapPin, Phone, Mail, Save,
  Smartphone, Share2, HelpCircle, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AgentSettings() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('AGENT_PROFILE_UPDATED');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="AGENT" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DEPOT_CONFIG</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">PORTAL_SETTINGS</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-indigo-600 transition-all disabled:opacity-50"
          >
            <Save size={16} /> {saving ? 'SAVING...' : 'UPDATE_PROFILE'}
          </button>
        </header>

        <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-4xl font-black italic mx-auto mb-6 shadow-inner border-4 border-white shadow-slate-100">
                S
              </div>
              <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tight">Sita Ram Agency</h2>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-6">DEPOT_ID: AGT-001</p>
              <div className="flex justify-center gap-2">
                <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100">CHANGE_LOGO</button>
                <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100">LOGOUT</button>
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-4">SECURITY_SHIELD</h3>
                <p className="text-sm font-bold leading-relaxed mb-6 italic">Two-Factor Authentication is active for your account.</p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/20">MANAGE_2FA</button>
              </div>
              <Shield className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Store size={14} /> DEPOT_IDENTITY</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Agency Name', val: 'Sita Ram Agency', icon: Store },
                  { label: 'Contact Person', val: 'Sita Ram', icon: User },
                  { label: 'Phone Number', val: '+91 98765 43210', icon: Phone },
                  { label: 'Email Address', val: 'sitaram@example.com', icon: Mail },
                ].map((f, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                      <input type="text" defaultValue={f.val} className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                    </div>
                  </div>
                ))}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Delivery Area / HQ</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input type="text" defaultValue="Sector 4, Rohini, New Delhi - 110085" className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Bell size={14} /> NOTIFICATION_PREFERENCES</h3>
              <div className="space-y-4">
                {[
                  { title: 'New Subscription Alerts', desc: 'Notify me when a new customer subscribes', active: true },
                  { title: 'Payment Verification', desc: 'Alert for every customer payment screenshot', active: true },
                  { title: 'Hawker Attendance', desc: 'Report when hawkers mark attendance', active: false },
                  { title: 'Daily Bill Summary', desc: 'WhatsApp summary of today\'s total collection', active: true },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 cursor-pointer hover:bg-slate-100 transition-all">
                    <div>
                      <p className="text-[10px] font-black text-slate-900 uppercase">{item.title}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked={item.active} className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-indigo-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-3 after:h-3 after:bg-white after:rounded-full checked:after:left-6 after:transition-all" />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
