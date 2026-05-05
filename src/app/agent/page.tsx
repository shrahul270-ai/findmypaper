"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, BookOpen, Camera,
  Wallet, TrendingUp, CheckCircle2, Clock, MapPin, Download, Search, 
  MessageSquare, Check, X, Edit3, Image as ImageIcon, ShieldCheck, FileText, Send, Bell, ArrowRight, DollarSign, UserCircle2
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ACCOUNTING' | 'CASH_TRACKING'>('OVERVIEW');

  const cashSubmissions = [
    { id: 'SUB-991', hawker: 'Ramesh Yadav', amount: 1650, date: '05 MAY 2026', status: 'PENDING', customers: 3 },
    { id: 'SUB-988', hawker: 'Amit Singh', amount: 840, date: '05 MAY 2026', status: 'PENDING', customers: 2 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <GlobalAlert message="AGENT_NOTICE: PLEASE VERIFY ALL CASH SUBMISSIONS BEFORE 8 PM EVERY DAY." />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
            <div>
              <p className="text-indigo-600 text-[10px] font-black tracking-[0.2em] uppercase mb-1">DEPOT_OPERATIONS: SECTOR_4</p>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">SITA_RAM_AGENCY</h1>
            </div>
            
            <div className="flex bg-white p-1.5 rounded-[1.5rem] border border-slate-100 shadow-sm overflow-x-auto max-w-full">
               <button onClick={() => setActiveTab('OVERVIEW')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeTab === 'OVERVIEW' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}>DASHBOARD</button>
               <button onClick={() => setActiveTab('CASH_TRACKING')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeTab === 'CASH_TRACKING' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}>HAWKER_CASH_LOG</button>
               <button onClick={() => setActiveTab('ACCOUNTING')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", activeTab === 'ACCOUNTING' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}>REPORTS</button>
            </div>
          </header>

          {activeTab === 'OVERVIEW' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* Summary Stats */}
               <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">TOTAL_CASH_COLLECTED</p>
                     <p className="text-4xl font-black text-slate-900 italic">₹42,500</p>
                     <TrendingUp className="absolute -right-4 -bottom-4 w-20 h-20 text-emerald-100 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">ACTIVE_CUSTOMERS</p>
                     <p className="text-4xl font-black text-slate-900 italic">1,240</p>
                  </div>
                  <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
                     <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-4">HAWKER_CASH_PENDING</p>
                     <p className="text-4xl font-black italic">₹{cashSubmissions.reduce((a,b) => a+b.amount, 0)}</p>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'CASH_TRACKING' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="p-8 border-b border-slate-100 bg-slate-50/20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg"><Wallet size={20} /></div>
                      <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">PENDING_HAWKER_CASH_SUBMISSIONS</h2>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                          <th className="px-8 py-5">HAWKER_NAME</th>
                          <th className="px-8 py-5">SUBMISSION_DATE</th>
                          <th className="px-8 py-5">COLLECTION_DETAILS</th>
                          <th className="px-8 py-5">TOTAL_AMOUNT</th>
                          <th className="px-8 py-5 text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {cashSubmissions.map((sub) => (
                          <tr key={sub.id} className="hover:bg-slate-50 transition-all group">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                     <UserCircle2 size={24} />
                                  </div>
                                  <div>
                                     <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{sub.hawker}</p>
                                     <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{sub.id}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">{sub.date}</td>
                            <td className="px-8 py-6">
                               <p className="text-[10px] font-black text-slate-600 uppercase tracking-tight">{sub.customers} CUSTOMERS COLLECTED</p>
                               <button className="text-[8px] font-black text-indigo-600 uppercase border-b border-indigo-100 hover:border-indigo-600 transition-all mt-1">VIEW_DETAILS</button>
                            </td>
                            <td className="px-8 py-6">
                               <p className="text-xl font-black text-slate-900 italic tracking-tighter">₹{sub.amount}</p>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">
                                  CONFIRM_RECEIPT
                                </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'ACCOUNTING' && (
            <div className="p-20 text-center">
               <p className="text-xs font-black text-slate-300 uppercase tracking-widest italic">Accounting reports loading...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
