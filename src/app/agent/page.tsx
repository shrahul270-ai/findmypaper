"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Plus, Newspaper, ClipboardList, BookOpen, Camera,
  Wallet, TrendingUp, CheckCircle2, Clock, MapPin, Download, Search, 
  MessageSquare, Check, X, Edit3, Image as ImageIcon, ShieldCheck, FileText, Send, Bell, ArrowRight
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ACCOUNTING'>('OVERVIEW');

  const accountingReports = [
    { id: 'RPT-101', date: '05 MAY 2026', type: '10_DAY_SUMMARY', status: 'UNREAD', note: 'All online payments verified for Rohini Sector 4.' },
    { id: 'RPT-098', date: '25 APR 2026', type: 'MONTHLY_AUDIT', status: 'READ', note: 'Monthly reconciliation complete.' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <GlobalAlert message="AGENT_NOTICE: NEW_AD_RATES_APPLICABLE_FROM_NEXT_WEEK. CONTACT ADMIN FOR UPDATED RATE CARD." />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
            <div>
              <p className="text-indigo-600 text-[10px] font-black tracking-[0.2em] uppercase mb-1">DEPOT_OPERATIONS: SECTOR_4</p>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">SITA_RAM_AGENCY</h1>
            </div>
            
            <div className="flex bg-white p-1.5 rounded-[1.5rem] border border-slate-100 shadow-sm">
               <button 
                onClick={() => setActiveTab('OVERVIEW')}
                className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'OVERVIEW' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}
               >DASHBOARD</button>
               <button 
                onClick={() => setActiveTab('ACCOUNTING')}
                className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'ACCOUNTING' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}
               >ACCOUNTING_UPDATES</button>
            </div>
          </header>

          {activeTab === 'OVERVIEW' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Stats & Overview (Existing Logic) */}
              <div className="lg:col-span-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">TOTAL_CUSTOMERS</p>
                       <p className="text-3xl font-black text-slate-900 italic">1,240</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">ACTIVE_HAWKERS</p>
                       <p className="text-3xl font-black text-slate-900 italic">18</p>
                    </div>
                    <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
                       <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-4">PENDING_COLLECTION</p>
                       <p className="text-3xl font-black italic">₹14,500</p>
                    </div>
                 </div>

                 {/* Recent Activity */}
                 <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                      <TrendingUp size={18} /> RECENT_OPERATIONS
                    </h3>
                    <div className="space-y-4">
                       {[1,2,3].map(i => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50/50 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 border border-slate-100"><Newspaper size={20} /></div>
                               <div>
                                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">New Subscription Added</p>
                                  <p className="text-[9px] font-bold text-slate-400">CUST-9921 • 10 mins ago</p>
                               </div>
                            </div>
                            <ArrowRight size={16} className="text-slate-300" />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 <button className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
                    <Plus size={20} /> ADD_NEW_CUSTOMER
                 </button>
                 <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
                    <p className="text-[9px] font-black text-emerald-200 uppercase tracking-widest mb-6">DEPOT_PERFORMANCE</p>
                    <p className="text-2xl font-black italic uppercase leading-tight mb-4">98%_ON_TIME_DELIVERY</p>
                    <div className="h-2 bg-emerald-400/30 rounded-full overflow-hidden">
                       <div className="h-full bg-white w-[98%]"></div>
                    </div>
                    <TrendingUp className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10 rotate-12" />
                 </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {/* Accounting Hub for Agent */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-8">
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="flex justify-between items-center mb-8">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg"><Bell size={20} /></div>
                            <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">VERIFIER_UPDATES_&_REPORTS</h2>
                          </div>
                        </div>

                        <div className="space-y-4">
                           {accountingReports.map((rpt) => (
                             <div key={rpt.id} className="group relative">
                               <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all">
                                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                                     <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border transition-all", rpt.status === 'UNREAD' ? "bg-indigo-600 text-white border-indigo-600 shadow-lg" : "bg-white text-slate-400 border-slate-100")}>
                                        <FileText size={24} />
                                     </div>
                                     <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{rpt.type}</p>
                                          {rpt.status === 'UNREAD' && <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase">NEW</span>}
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rpt.date} • {rpt.id}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                     <p className="hidden md:block text-[10px] font-bold text-slate-500 italic max-w-xs text-right leading-relaxed">{rpt.note}</p>
                                     <button className="bg-white border border-slate-200 p-3 rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                        <Download size={18} />
                                     </button>
                                  </div>
                               </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                     <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
                        <div className="relative z-10">
                           <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                             <ShieldCheck size={14} /> VERIFIER_COMMUNICATION
                           </h4>
                           <p className="text-lg font-black italic uppercase leading-snug mb-6">Got a billing dispute? Contact the accounting team directly.</p>
                           <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all">
                              OPEN_DIRECT_CHAT
                           </button>
                        </div>
                        <MessageSquare className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10 rotate-12 group-hover:rotate-0 transition-all duration-500" />
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
