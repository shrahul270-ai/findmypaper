"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Settings, Shield, Bell, Smartphone, 
  CreditCard, Globe, Database, Save, 
  Lock, RefreshCw, Check, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'SECURITY' | 'NOTIFICATIONS' | 'PAYMENTS'>('GENERAL');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('SYSTEM_CONFIG_UPDATED: Changes saved successfully.');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">SYSTEM_ROOT</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">GLOBAL_SETTINGS</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all disabled:opacity-50"
          >
            {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'SAVING_CHANGES...' : 'SAVE_CONFIG'}
          </button>
        </header>

        {/* Settings Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'GENERAL', label: 'General', icon: Globe },
            { id: 'SECURITY', label: 'Security', icon: Lock },
            { id: 'NOTIFICATIONS', label: 'Notifications', icon: Bell },
            { id: 'PAYMENTS', label: 'Payments', icon: CreditCard },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                  : "bg-white text-slate-400 border-slate-100 hover:border-indigo-200"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            
            {activeTab === 'GENERAL' && (
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                <div>
                  <h2 className="text-lg font-black text-slate-900 italic uppercase tracking-tight mb-6">SYSTEM_IDENTITY</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Platform Name</label>
                      <input type="text" defaultValue="FINDMYPAPER ERP" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Support Email</label>
                      <input type="email" defaultValue="support@findmypaper.com" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-600" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">System Timezone</label>
                      <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase outline-none focus:ring-2 focus:ring-indigo-600">
                        <option>(GMT+05:30) India Standard Time</option>
                        <option>(GMT+00:00) UTC</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-50">
                  <h2 className="text-lg font-black text-slate-900 italic uppercase tracking-tight mb-6">REGISTRATION_SETTINGS</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 cursor-pointer group">
                      <div>
                        <p className="text-[10px] font-black text-slate-900 uppercase">Allow Self-Registration</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">New agents can sign up without admin invite</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-indigo-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-3 after:h-3 after:bg-white after:rounded-full checked:after:left-6 after:transition-all" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'NOTIFICATIONS' && (
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-lg font-black text-slate-900 italic uppercase tracking-tight mb-6">NOTIFICATION_CHANNELS</h2>
                <div className="space-y-4">
                  {[
                    { title: 'WhatsApp Alerts', desc: 'Send automated billing & attendance alerts via WhatsApp', active: true },
                    { title: 'Push Notifications', desc: 'Real-time updates for Hawker delivery events', active: true },
                    { title: 'Email Reports', desc: 'Daily P&L summaries to admin & verifiers', active: false },
                    { title: 'SMS Backup', desc: 'Failover SMS for critical payment failures', active: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div>
                        <p className="text-[10px] font-black text-slate-900 uppercase">{item.title}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{item.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked={item.active} className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-indigo-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-3 after:h-3 after:bg-white after:rounded-full checked:after:left-6 after:transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'PAYMENTS' && (
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                <h2 className="text-lg font-black text-slate-900 italic uppercase tracking-tight mb-6">PAYMENT_GATEWAY_CONFIG</h2>
                <div className="space-y-6">
                  <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center"><CreditCard size={20} /></div>
                      <div>
                        <p className="text-[10px] font-black text-indigo-600 uppercase">Primary UPI Provider</p>
                        <p className="text-sm font-black text-slate-800 italic uppercase">PhonePe_Business_API</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase px-2">Merchant ID</p>
                        <input type="password" value="********9921" readOnly className="w-full p-3 bg-white border border-slate-100 rounded-xl text-[10px] font-bold outline-none" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase px-2">Secret Key</p>
                        <input type="password" value="********AABB" readOnly className="w-full p-3 bg-white border border-slate-100 rounded-xl text-[10px] font-bold outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 italic">SYSTEM_HEALTH</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Database</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400"><Check size={12} /> ONLINE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">FCM Push</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400"><Check size={12} /> ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp API</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400"><Check size={12} /> CONNECTED</span>
                  </div>
                </div>
              </div>
              <Database className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
            </div>

            <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-rose-600">
                <AlertTriangle size={20} />
                <h3 className="text-[10px] font-black uppercase tracking-widest">DANGER_ZONE</h3>
              </div>
              <p className="text-[9px] font-bold text-rose-500 uppercase leading-relaxed mb-6">Sensitive system actions. Proceed with extreme caution.</p>
              <div className="space-y-3">
                <button className="w-full py-4 bg-white text-rose-600 rounded-2xl font-black text-[9px] tracking-widest uppercase border border-rose-200 hover:bg-rose-600 hover:text-white transition-all">FLUSH_CACHE</button>
                <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-[9px] tracking-widest uppercase shadow-lg shadow-rose-100">MAINTENANCE_MODE</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
