"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { BarChart3, Download, TrendingUp, TrendingDown, Users, DollarSign, Bike, Store, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const monthlyRevenue = [
  { month: 'Dec', value: 38000, pct: 62 },
  { month: 'Jan', value: 42000, pct: 69 },
  { month: 'Feb', value: 39500, pct: 65 },
  { month: 'Mar', value: 45000, pct: 74 },
  { month: 'Apr', value: 48200, pct: 79 },
  { month: 'May', value: 61000, pct: 100 },
];

const agentPerformance = [
  { name: 'Metro News Agency', customers: 480, collected: 52000, pct: 95 },
  { name: 'Sita Ram Agency', customers: 340, collected: 38000, pct: 87 },
  { name: 'Sunrise Depot', customers: 290, collected: 31000, pct: 82 },
  { name: 'Raj Enterprises', customers: 210, collected: 22000, pct: 71 },
  { name: 'Kumar Distribution', customers: 120, collected: 10000, pct: 55 },
];

const paperDist = [
  { name: 'Times of India', count: 420, pct: 100, color: 'bg-indigo-500' },
  { name: 'Dainik Bhaskar', count: 310, pct: 74, color: 'bg-emerald-500' },
  { name: 'Amar Ujala', count: 280, pct: 67, color: 'bg-amber-500' },
  { name: 'Economic Times', count: 190, pct: 45, color: 'bg-violet-500' },
  { name: 'Hindustan Times', count: 150, pct: 36, color: 'bg-rose-500' },
];

export default function AdminReports() {
  const [period, setPeriod] = useState('MONTHLY');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">ANALYTICS_CORE</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">SYSTEM_REPORTS</h1>
          </div>
          <div className="flex gap-3">
            {['WEEKLY', 'MONTHLY', 'YEARLY'].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={cn("px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                  period === p ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-slate-400 border-slate-200')}>
                {p}
              </button>
            ))}
            <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-indigo-600 transition-all">
              <Download size={14} /> EXPORT
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TOTAL_REVENUE', value: '₹4,85,200', change: '+18%', up: true, icon: DollarSign, cls: 'bg-indigo-50 text-indigo-600' },
            { label: 'ACTIVE_CUSTOMERS', value: '1,440', change: '+12%', up: true, icon: Users, cls: 'bg-emerald-50 text-emerald-600' },
            { label: 'TOTAL_HAWKERS', value: '128', change: '+5%', up: true, icon: Bike, cls: 'bg-amber-50 text-amber-600' },
            { label: 'REJECTED_BILLS', value: '42', change: '-8%', up: false, icon: Store, cls: 'bg-rose-50 text-rose-600' },
          ].map((k, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", k.cls)}><k.icon size={18} /></div>
                <span className={cn("text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide",
                  k.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>
                  {k.up ? <TrendingUp size={10} className="inline mr-1" /> : <TrendingDown size={10} className="inline mr-1" />}{k.change}
                </span>
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
              <p className="text-2xl font-black text-slate-900 italic">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
          {/* Revenue Bar Chart */}
          <div className="xl:col-span-7 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">REVENUE_TREND</p>
                <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">Monthly Collection</h2>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">
                <TrendingUp size={14} />
                <span className="text-[10px] font-black uppercase">+26% vs Dec</span>
              </div>
            </div>
            <div className="flex items-end gap-4 h-48">
              {monthlyRevenue.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase">₹{Math.round(m.value / 1000)}K</p>
                  <div className="w-full relative" style={{ height: `${m.pct * 1.6}px` }}>
                    <div className={cn("w-full rounded-t-xl transition-all duration-700",
                      i === monthlyRevenue.length - 1 ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-100 hover:bg-slate-200')}
                      style={{ height: '100%' }} />
                  </div>
                  <p className={cn("text-[9px] font-black uppercase tracking-widest",
                    i === monthlyRevenue.length - 1 ? 'text-indigo-600' : 'text-slate-400')}>{m.month}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Paper Distribution */}
          <div className="xl:col-span-5 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">PUBLICATION_ANALYSIS</p>
            <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter mb-8">Top Papers</h2>
            <div className="space-y-5">
              {paperDist.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{p.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{p.count} subs</p>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-700", p.color)} style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Performance Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">PERFORMANCE_MATRIX</p>
            <h2 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">Agent Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-4">Agent</th>
                  <th className="px-6 py-4 text-center">Customers</th>
                  <th className="px-6 py-4 text-right">Collected</th>
                  <th className="px-8 py-4">Collection Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {agentPerformance.map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-black italic text-sm">{a.name[0]}</div>
                        <p className="font-black text-slate-900 italic text-sm uppercase tracking-tight">{a.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center font-black text-slate-900 italic">{a.customers}</td>
                    <td className="px-6 py-5 text-right font-black text-slate-900 italic">₹{a.collected.toLocaleString()}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", a.pct >= 90 ? 'bg-emerald-500' : a.pct >= 70 ? 'bg-amber-500' : 'bg-rose-500')} style={{ width: `${a.pct}%` }} />
                        </div>
                        <span className={cn("text-[10px] font-black uppercase w-10 text-right",
                          a.pct >= 90 ? 'text-emerald-600' : a.pct >= 70 ? 'text-amber-600' : 'text-rose-600')}>{a.pct}%</span>
                      </div>
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
