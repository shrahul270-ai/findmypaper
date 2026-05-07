"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { CreditCard, FileText, Download, CheckCircle2, Clock, XCircle, TrendingUp, DollarSign, Users, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const bills = [
  { id: 'BILL-001', customer: 'Anil Mehta', agent: 'Sita Ram Agency', period: 'May 2026', amount: 450, status: 'PAID', dueDate: '15 May 2026' },
  { id: 'BILL-002', customer: 'Priya Dhar', agent: 'Sita Ram Agency', period: 'May 2026', amount: 180, status: 'PENDING', dueDate: '15 May 2026' },
  { id: 'BILL-003', customer: 'Suresh Kumar', agent: 'Raj Enterprises', period: 'May 2026', amount: 230, status: 'PAID', dueDate: '15 May 2026' },
  { id: 'BILL-004', customer: 'Daily Store', agent: 'Metro News Agency', period: 'May 2026', amount: 1200, status: 'OVERDUE', dueDate: '10 May 2026' },
  { id: 'BILL-005', customer: 'Meena Gupta', agent: 'Metro News Agency', period: 'May 2026', amount: 180, status: 'PAID', dueDate: '15 May 2026' },
  { id: 'BILL-006', customer: 'Rajesh Sharma', agent: 'Sunrise Depot', period: 'May 2026', amount: 275, status: 'PENDING', dueDate: '15 May 2026' },
];

const STATUS_STYLE: Record<string, string> = {
  PAID: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  PENDING: 'bg-amber-50 text-amber-600 border-amber-100',
  OVERDUE: 'bg-rose-50 text-rose-600 border-rose-100',
};
const STATUS_ICON: Record<string, React.ReactNode> = {
  PAID: <CheckCircle2 size={13} />,
  PENDING: <Clock size={13} />,
  OVERDUE: <AlertCircle size={13} />,
};

export default function AdminBilling() {
  const [filter, setFilter] = useState('ALL');
  const [generating, setGenerating] = useState(false);

  const filtered = bills.filter(b => filter === 'ALL' || b.status === filter);
  const collected = bills.filter(b => b.status === 'PAID').reduce((s, b) => s + b.amount, 0);
  const expected = bills.reduce((s, b) => s + b.amount, 0);
  const overdue = bills.filter(b => b.status === 'OVERDUE').reduce((s, b) => s + b.amount, 0);
  const pending = bills.filter(b => b.status === 'PENDING').reduce((s, b) => s + b.amount, 0);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); alert('Bills generated for all active subscriptions!'); }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">FINANCE_HUB</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">BILLING_OPERATIONS</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-slate-200 transition-all">
              <Download size={14} /> EXPORT
            </button>
            <button onClick={handleGenerate} disabled={generating}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all disabled:opacity-60">
              <FileText size={14} /> {generating ? 'GENERATING...' : 'GENERATE_BILLS'}
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'EXPECTED', value: `₹${expected.toLocaleString()}`, sub: 'This cycle', cls: 'bg-slate-900 text-white', textCls: 'text-indigo-400', valCls: 'text-white' },
            { label: 'COLLECTED', value: `₹${collected.toLocaleString()}`, sub: `${Math.round((collected / expected) * 100)}% of target`, cls: 'bg-emerald-50', textCls: 'text-emerald-600', valCls: 'text-emerald-700' },
            { label: 'PENDING', value: `₹${pending.toLocaleString()}`, sub: `${bills.filter(b => b.status === 'PENDING').length} bills`, cls: 'bg-amber-50', textCls: 'text-amber-600', valCls: 'text-amber-700' },
            { label: 'OVERDUE', value: `₹${overdue.toLocaleString()}`, sub: `${bills.filter(b => b.status === 'OVERDUE').length} bills`, cls: 'bg-rose-50', textCls: 'text-rose-600', valCls: 'text-rose-700' },
          ].map((s, i) => (
            <div key={i} className={cn("p-6 rounded-[2rem] border border-slate-100 shadow-sm", s.cls)}>
              <p className={cn("text-[9px] font-black uppercase tracking-widest mb-1", s.textCls)}>{s.label}</p>
              <p className={cn("text-2xl font-black italic mb-1", s.valCls)}>{s.value}</p>
              <p className={cn("text-[9px] font-black uppercase", s.textCls)}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Collection Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">COLLECTION_PROGRESS: MAY 2026</p>
            <p className="text-[10px] font-black text-indigo-600 uppercase">{Math.round((collected / expected) * 100)}% COLLECTED</p>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: `${(collected / expected) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-[9px] font-black text-emerald-600 uppercase">COLLECTED: ₹{collected.toLocaleString()}</span>
            <span className="text-[9px] font-black text-slate-400 uppercase">TARGET: ₹{expected.toLocaleString()}</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6">
          {['ALL', 'PAID', 'PENDING', 'OVERDUE'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                filter === f ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-slate-400 border-slate-200')}>
              {f}
            </button>
          ))}
        </div>

        {/* Bills Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-5">Bill ID</th>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Agent</th>
                  <th className="px-6 py-5">Period</th>
                  <th className="px-6 py-5 text-right">Amount</th>
                  <th className="px-6 py-5">Due Date</th>
                  <th className="px-8 py-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6 text-xs font-bold text-slate-300">#{b.id}</td>
                    <td className="px-6 py-6 font-black text-slate-900 italic text-sm uppercase">{b.customer}</td>
                    <td className="px-6 py-6 text-[10px] font-black text-indigo-600 uppercase">{b.agent}</td>
                    <td className="px-6 py-6 text-[10px] font-black text-slate-500 uppercase">{b.period}</td>
                    <td className="px-6 py-6 text-right font-black text-slate-900 text-base italic">₹{b.amount}</td>
                    <td className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase">{b.dueDate}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={cn("inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border", STATUS_STYLE[b.status])}>
                        {STATUS_ICON[b.status]} {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
