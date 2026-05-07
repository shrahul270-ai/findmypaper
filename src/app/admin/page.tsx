"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Bike, Newspaper, CreditCard, 
  Settings, Search, CheckCircle2, XCircle, Clock, 
  ArrowUpRight, History, ShieldCheck, Download, 
  Filter, UserCircle2, BarChart3, TrendingUp, DollarSign,
  AlertCircle, Activity
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'OVERVIEW' | 'HISTORY'>('OVERVIEW');

  // Global Transaction Data
  const [allTransactions] = useState([
    { id: 'TX501', hawker: 'Rahul Sharma', customer: 'Anil Mehta', amount: 450, status: 'PAID', time: '10:30 AM', agent: 'Amit Singh' },
    { id: 'TX502', hawker: 'Rahul Sharma', customer: 'Suresh Kumar', amount: 320, status: 'PENDING', time: '11:15 AM', agent: 'Amit Singh' },
    { id: 'TX503', hawker: 'Sunil Verma', customer: 'Priya Dhar', amount: 500, status: 'REJECTED', reason: 'Fake Screenshot', time: '09:00 AM', agent: 'Amit Singh' },
    { id: 'TX504', hawker: 'Amit Gupta', customer: 'Daily Store', amount: 1200, status: 'PAID', time: 'Yesterday', agent: 'Sanjay Kumar' },
  ]);

  const filteredHistory = allTransactions.filter(tx => 
    tx.hawker.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ADMIN" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">SUPER_ADMIN_CONSOLE</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">SYSTEM_GRAND_AUDIT</h1>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="SEARCH HAWKER, CUSTOMER, TX_ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none focus:ring-2 focus:ring-indigo-600"
                />
             </div>
          </div>
        </header>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><DollarSign size={20} /></div>
                 <span className="text-[8px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">+18%</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TOTAL_REVENUE</p>
              <p className="text-3xl font-black text-slate-900 italic tracking-tighter">₹4,85,200</p>
           </div>
           <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center"><AlertCircle size={20} /></div>
                 <span className="text-[8px] font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-full">ACTION REQ</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">REJECTED_BILLS</p>
              <p className="text-3xl font-black text-slate-900 italic tracking-tighter">42</p>
           </div>
           <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">ACTIVE_HAWKERS</p>
                 <p className="text-3xl font-black italic tracking-tighter text-emerald-400">128</p>
              </div>
              <Activity className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
           </div>
        </div>

        {/* Global Transaction History (PhonePe Style) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-8">
           <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center gap-2"><History size={20} className="text-indigo-600" /> GLOBAL_TRANSACTION_LOG</h2>
              <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600 pb-1">DOWNLOAD_EXCEL</button>
           </div>

           <div className="space-y-6">
              {filteredHistory.map((tx, i) => (
                 <div key={i} className="flex flex-col md:flex-row justify-between md:items-center p-6 border-b border-slate-50 hover:bg-slate-50 transition-all rounded-3xl group">
                    <div className="flex items-center gap-5 mb-4 md:mb-0">
                       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", 
                          tx.status === 'PAID' ? "bg-emerald-50 text-emerald-600" : 
                          tx.status === 'REJECTED' ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                       )}>
                          {tx.status === 'PAID' ? <CheckCircle2 size={24} /> : tx.status === 'REJECTED' ? <XCircle size={24} /> : <Clock size={24} />}
                       </div>
                       <div>
                          <p className="font-black text-slate-900 uppercase italic text-base tracking-tighter">{tx.customer}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">HAWKER: {tx.hawker} | AGENT: {tx.agent}</p>
                       </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-end gap-1">
                       <p className="text-xl font-black text-slate-900 italic tracking-tighter">₹{tx.amount}</p>
                       <div className="flex items-center gap-2">
                          <span className={cn("text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full", 
                             tx.status === 'PAID' ? "text-emerald-600 bg-emerald-50" : 
                             tx.status === 'REJECTED' ? "text-rose-600 bg-rose-50" : "text-indigo-600 bg-indigo-50"
                          )}>
                             {tx.status}
                          </span>
                          <span className="text-[8px] font-black text-slate-400 uppercase">{tx.time}</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}
