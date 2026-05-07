"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Wallet, TrendingUp, TrendingDown, CreditCard, 
  ArrowUpRight, ArrowDownLeft, Calendar, Filter, 
  Download, FileText, CheckCircle2, Clock, AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  category: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

const MOCK_TXS: Transaction[] = [
  { id: 'TX-9901', type: 'CREDIT', amount: 45000, description: 'MAY_COLLECTION_TOTAL', category: 'COLLECTION', date: '05 May 2024', status: 'COMPLETED' },
  { id: 'TX-9902', type: 'DEBIT', amount: 12000, description: 'PAPER_PAYMENT_TO_DEPOT', category: 'STOCK', date: '04 May 2024', status: 'COMPLETED' },
  { id: 'TX-9903', type: 'DEBIT', amount: 3500, description: 'HAWKER_INCENTIVE_PAYOUT', category: 'INCENTIVE', date: '03 May 2024', status: 'COMPLETED' },
  { id: 'TX-9904', type: 'CREDIT', amount: 1200, description: 'NEW_SUBSCRIPTION_ADVANCE', category: 'ADVANCE', date: '02 May 2024', status: 'PENDING' },
  { id: 'TX-9905', type: 'DEBIT', amount: 500, description: 'SMS_GATEWAY_RECHARGE', category: 'UTILITY', date: '01 May 2024', status: 'COMPLETED' },
];

export default function AgentAccounting() {
  const [transactions] = useState<Transaction[]>(MOCK_TXS);
  const [period, setPeriod] = useState('MAY_2024');

  const stats = {
    balance: 18450,
    earnings: 68400,
    expenses: 12500,
    pending: 4200
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="AGENT" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">FINANCIAL_LOGS</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">AGENT_ACCOUNTING</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-slate-200 transition-all">
              <Download size={14} /> EXPORT_LEDGER
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all">
              <CreditCard size={14} /> RECHARGE_WALLET
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">CURRENT_BALANCE</p>
              <p className="text-3xl font-black italic tracking-tighter mb-4">₹{stats.balance.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-[8px] font-black text-emerald-400 uppercase">
                <TrendingUp size={10} /> +12% vs last month
              </div>
            </div>
            <Wallet className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
          </div>

          {[
            { label: 'TOTAL_EARNINGS', value: stats.earnings, icon: ArrowUpRight, cls: 'bg-emerald-50 text-emerald-600' },
            { label: 'TOTAL_EXPENSES', value: stats.expenses, icon: ArrowDownLeft, cls: 'bg-rose-50 text-rose-600' },
            { label: 'PENDING_COLLECTION', value: stats.pending, icon: Clock, cls: 'bg-amber-50 text-amber-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.cls)}><s.icon size={18} /></div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-900 italic">₹{s.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">TRANSACTION_HISTORY</p>
                <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">Recent Ledger Logs</h2>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-slate-900 transition-colors"><Filter size={16} /></button>
                <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-slate-900 transition-colors"><Calendar size={16} /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <th className="px-8 py-4">Ref_ID</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-8 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5 text-[10px] font-bold text-slate-400">#{tx.id}</td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-slate-900 italic uppercase tracking-tight leading-none mb-1">{tx.description}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">{tx.date}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase">{tx.category}</span>
                      </td>
                      <td className={cn("px-6 py-5 text-right font-black italic text-base", tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-rose-600')}>
                        {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border", 
                          tx.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          tx.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100')}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">COLLECTION_BREAKDOWN</h3>
              <div className="space-y-6">
                {[
                  { label: 'Papers Cost', value: 42000, pct: 60, color: 'bg-indigo-600' },
                  { label: 'Agent Commission', value: 18000, pct: 25, color: 'bg-emerald-600' },
                  { label: 'Hawker Charges', value: 8400, pct: 15, color: 'bg-amber-600' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-slate-700 uppercase">{item.label}</span>
                      <span className="text-[10px] font-black text-slate-900 italic">₹{item.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <div className={cn("h-full rounded-full transition-all duration-700", item.color)} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                <FileText size={14} /> DOWNLOAD_DETAILED_REPORT
              </button>
            </div>

            <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <h3 className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-4">DEPOT_TAX_ESTIMATE</h3>
              <p className="text-2xl font-black italic mb-6 tracking-tight">₹4,200 <span className="text-xs font-bold text-indigo-300">/ Est. Q2</span></p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                <p className="text-[9px] font-bold text-indigo-100 uppercase leading-relaxed">Tax calculation based on automated collection reports. Consult your CA for final filing.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
