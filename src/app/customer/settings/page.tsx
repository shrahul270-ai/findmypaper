"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  User, Lock, Bell, Shield, 
  CreditCard, MapPin, Phone, Mail, 
  Save, LogOut, Smartphone, Heart,
  HelpCircle, ChevronRight, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerSettings() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('PREFERENCES_SAVED: Your account settings have been updated.');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="CUSTOMER" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">USER_PORTAL</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">MY_ACCOUNT_SETTINGS</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all"
          >
            <Save size={16} /> {saving ? 'SAVING...' : 'SAVE_PREFERENCES'}
          </button>
        </header>

        <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Settings Navigation */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-4xl font-black italic mx-auto mb-6 shadow-inner border-4 border-white">
                R
              </div>
              <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tight">Rahul Sharma</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">MEMBER_ID: CUST-7701</p>
              <button className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-center gap-2 border border-slate-100">
                <LogOut size={14} /> LOGOUT_SECURELY
              </button>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">SECURITY_STATUS</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Verification</span>
                    <span className="text-[9px] font-black text-emerald-400 uppercase flex items-center gap-1"><CheckCircle2 size={10} /> Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">2FA Auth</span>
                    <span className="text-[9px] font-black text-rose-400 uppercase">Disabled</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/10">ENABLE_PROTECTION</button>
              </div>
              <Shield className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Profile Form */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2"><User size={14} /> PERSONAL_DETAILS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Full Name</label>
                  <input type="text" defaultValue="Rahul Sharma" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Mobile Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Primary Address</label>
                  <textarea rows={3} defaultValue="Flat No. 402, Block C, Sunshine Apartments, Rohini Sector 4, New Delhi - 110085" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600 resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Bell size={14} /> COMMUNICATION_PREFS</h3>
              <div className="space-y-4">
                {[
                  { title: 'WhatsApp Billing', desc: 'Receive monthly bill via WhatsApp', active: true },
                  { title: 'Delivery Status', desc: 'Notify when newspaper is delivered', active: true },
                  { title: 'Payment Confirmations', desc: 'Alert when payment is approved', active: true },
                  { title: 'Marketing Offers', desc: 'Occasional magazine & booklet deals', active: false },
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

            {/* Support Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600"><HelpCircle size={20} /></div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">GET_SUPPORT</span>
                </div>
                <ChevronRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-all" />
              </button>
              <button className="p-6 bg-rose-50 rounded-[2rem] border border-rose-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-rose-500"><Shield size={20} /></div>
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">CLOSE_ACCOUNT</span>
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
