"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, BookOpen, Camera,
  Wallet, TrendingUp, CheckCircle2, Clock, MapPin, Download, Search, MessageSquare, Check, X, Edit3, Image as ImageIcon, Phone, Fingerprint, Eye, Megaphone
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('HAWKERS');
  
  const ads = [
    { tag: 'DEPOT_PROMO', title: 'UPGRADE TO E-BIKE FOR HAWKERS' },
    { tag: 'GOVT_AD', title: 'SOCIAL SECURITY FOR HAWKERS ENROLLMENT' }
  ];

  const hawkers = [
    { id: 'H001', name: 'Ramesh Yadav', area: 'Sector 4', status: 'PRESENT', cash: 1200, customers: 45 },
    { id: 'H002', name: 'Amit Singh', area: 'Rohini Block A', status: 'PRESENT', cash: 800, customers: 32 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col md:flex-row">
      <GlobalAlert message="SYSTEM_UPDATE: VERIFY ALL SUNDAY SETTLEMENTS BY 6 PM TODAY. NEW_AD_SLOTS_AVAILABLE." />
      <TopAdBar ads={ads} />
      
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase leading-none mb-2">AGENT_TERMINAL: ACTIVE</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 italic uppercase">CONTROL_CENTER</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {['HAWKERS', 'ORDERS', 'REQUESTS'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all whitespace-nowrap", activeTab === tab ? "bg-slate-900 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100")}>{tab}</button>
              ))}
            </div>

            {activeTab === 'HAWKERS' && (
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-100/50">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/50 text-[9px] uppercase font-bold text-slate-400"><tr className="border-b border-slate-100"><th className="px-6 py-4">HAWKER_&_AREA</th><th className="px-6 py-4">CUSTOMERS</th><th className="px-6 py-4 text-right">ACTION</th></tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {hawkers.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-6 py-4">
                          <p className="font-black text-slate-800 uppercase tracking-tighter text-base">{h.name}</p>
                          <p className="text-[10px] font-bold text-indigo-500 uppercase flex items-center gap-1"><MapPin size={10} /> {h.area}</p>
                        </td>
                        <td className="px-6 py-4">
                           <p className="text-xl font-black text-slate-900 tracking-tighter">{h.customers}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase hover:bg-indigo-600 transition-all">VIEW_PROFILE</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">TOTAL_COLLECTION</p>
                <p className="text-3xl font-black tracking-tighter text-white uppercase italic">₹42.5K</p>
                <div className="mt-6 flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                   <p className="text-[10px] font-bold text-slate-400 uppercase">ACTIVE_HAWKERS</p>
                   <p className="text-xl font-black">12</p>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
