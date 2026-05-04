"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, BookOpen, Camera,
  Wallet, TrendingUp, CheckCircle2, Clock, MapPin, Download, Search, MessageSquare, Check, X, Edit3, Image as ImageIcon, Phone, Fingerprint, Eye, Megaphone
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';
import { GlobalAlert, AdBanner } from '@/components/ui/Promotions';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('HAWKERS'); // HAWKERS, REQUESTS, MARKET, ORDERS
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const hawkers = [
    { id: 'H001', name: 'Ramesh Yadav', area: 'Sector 4', status: 'PRESENT', cash: 1200, customers: 45 },
    { id: 'H002', name: 'Amit Singh', area: 'Rohini Block A', status: 'PRESENT', cash: 800, customers: 32 },
  ];

  const handleViewProfile = (customer: any) => {
    setSelectedCustomer(customer);
    setShowProfileModal(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col md:flex-row">
      <GlobalAlert message="SYSTEM_UPDATE: PLEASE VERIFY ALL SUNDAY SETTLEMENTS BY 6 PM TODAY." />
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase leading-none mb-2">DEPOT_COMMAND: ACTIVE</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 italic uppercase">AGENT_TERMINAL</h1>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
             <button className="flex-1 lg:flex-none bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl">SEND_BROADCAST</button>
             <button className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-400"><Megaphone size={24} /></button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* AD BANNER FOR AGENTS */}
            <AdBanner 
              tag="DEPOT_PROMO"
              title="UPGRADE TO E-BIKE FOR HAWKERS"
              desc="Special finance scheme for newspaper hawkers. Zero downpayment for PaperFlow agents."
            />

            {/* Tab Selection */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {['HAWKERS', 'ORDERS', 'REQUESTS'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-6 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all whitespace-nowrap", activeTab === tab ? "bg-slate-900 text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100")}>{tab}</button>
              ))}
            </div>

            {activeTab === 'HAWKERS' && (
              <div className="card p-0 overflow-hidden shadow-xl shadow-slate-100 animate-fade-in">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/50 text-[9px] uppercase font-bold text-slate-400">
                    <tr>
                      <th className="px-6 py-4">HAWKER_&_AREA</th>
                      <th className="px-6 py-4">CUSTOMERS</th>
                      <th className="px-6 py-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {hawkers.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-6 py-4">
                          <p className="font-black text-slate-800 uppercase tracking-tighter text-base">{h.name}</p>
                          <p className="text-[10px] font-bold text-indigo-500 uppercase flex items-center gap-1 mt-1"><MapPin size={10} /> {h.area}</p>
                        </td>
                        <td className="px-6 py-4">
                           <p className="text-xl font-black text-slate-900 tracking-tighter">{h.customers}</p>
                           <p className="text-[8px] font-bold text-slate-400 uppercase">ACTIVE_DELIVERIES</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleViewProfile(h)}
                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase hover:bg-indigo-600 transition-all"
                          >
                            <Eye size={12} /> FULL_PROFILE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8 animate-slide-up delay-200">
             <div className="card bg-slate-900 text-white border-none shadow-2xl shadow-indigo-100 p-8">
                <h2 className="text-xs font-black tracking-widest uppercase text-indigo-400 mb-6 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-indigo-500"></div> QUICK_SUMMARY
                </h2>
                <div className="space-y-6">
                   <div className="flex justify-between items-end border-b border-white/5 pb-4">
                      <div>
                         <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">TOTAL_COLLECTION</p>
                         <p className="text-3xl font-black tracking-tighter text-white uppercase italic">₹42.5K</p>
                      </div>
                      <TrendingUp className="text-emerald-500 mb-2" size={24} />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl">
                         <p className="text-[8px] font-black text-slate-500 uppercase mb-1">PRESENT</p>
                         <p className="text-lg font-black text-white">12</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl">
                         <p className="text-[8px] font-black text-slate-500 uppercase mb-1">ABSENT</p>
                         <p className="text-lg font-black text-white">02</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* AD BANNER: GOVT AD */}
            <AdBanner 
              tag="GOVT_AD"
              title="PENSION SCHEME FOR HAWKERS"
              desc="Enroll today and secure your future. A social security initiative for small distributors."
            />
          </div>
        </div>

        {/* Customer/Hawker Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-white max-w-2xl w-full rounded-[3rem] p-8 md:p-12 shadow-2xl animate-scale-in relative">
              <button onClick={() => setShowProfileModal(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900"><X size={28} /></button>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300">
                  <User size={64} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">VERIFIED_PROFILE</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {selectedCustomer?.id}</p>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-4">{selectedCustomer?.name}</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">PRIMARY_CONTACT</p>
                      <p className="text-sm font-black text-slate-800">+91 98765 43210</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">JOINED_DATE</p>
                      <p className="text-sm font-black text-slate-800 uppercase">12 JAN 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">TOTAL_BILL_PAID</p>
                    <p className="text-xl font-black text-slate-900 tracking-tighter">₹12,450</p>
                 </div>
                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">ACTIVE_SUBSCRIPTIONS</p>
                    <p className="text-xl font-black text-indigo-600 tracking-tighter">03</p>
                 </div>
                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">LAST_DELIVERY</p>
                    <p className="text-xl font-black text-emerald-600 tracking-tighter uppercase">SUCCESS</p>
                 </div>
              </div>

              <div className="mt-10 flex gap-3">
                 <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl">EDIT_DETAILS</button>
                 <button className="flex-1 border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-black text-xs tracking-widest uppercase">VIEW_HISTORY_LOG</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { opacity: 0; scale: 0.95; } to { opacity: 1; scale: 1; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
