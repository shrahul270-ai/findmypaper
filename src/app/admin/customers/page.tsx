"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Users, Search, Filter, Eye, X, Phone, MapPin, Newspaper, CheckCircle2, Clock, XCircle, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Customer {
  id: string; name: string; phone: string; address: string;
  agent: string; hawker: string; papers: string[];
  monthlyBill: number; balance: number;
  subStatus: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  payStatus: 'PAID' | 'PENDING' | 'OVERDUE';
  joinDate: string;
}

const MOCK: Customer[] = [
  { id: 'CST-001', name: 'Anil Mehta', phone: '9876543210', address: 'A-12, Rohini Sec 4', agent: 'Sita Ram Agency', hawker: 'Ramesh Yadav', papers: ['TOI', 'Bhaskar'], monthlyBill: 450, balance: 450, subStatus: 'ACTIVE', payStatus: 'PAID', joinDate: '15 Jan 2024' },
  { id: 'CST-002', name: 'Priya Dhar', phone: '9988776655', address: 'B-5, Rohini Sec 7', agent: 'Sita Ram Agency', hawker: 'Sunil Verma', papers: ['TOI'], monthlyBill: 180, balance: -180, subStatus: 'ACTIVE', payStatus: 'PENDING', joinDate: '10 Feb 2024' },
  { id: 'CST-003', name: 'Suresh Kumar', phone: '9555666777', address: 'C-22, Dwarka Sec 10', agent: 'Raj Enterprises', hawker: 'Arun Sharma', papers: ['Amar Ujala', 'Champak'], monthlyBill: 230, balance: 0, subStatus: 'ACTIVE', payStatus: 'PAID', joinDate: '05 Mar 2024' },
  { id: 'CST-004', name: 'Daily Store Rohini', phone: '9111222333', address: 'Shop 4, Main Mkt', agent: 'Metro News Agency', hawker: 'Pankaj Mishra', papers: ['ET', 'HT', 'TOI'], monthlyBill: 1200, balance: -1200, subStatus: 'ACTIVE', payStatus: 'OVERDUE', joinDate: '01 Sep 2023' },
  { id: 'CST-005', name: 'Meena Gupta', phone: '9222333444', address: 'D-8, Pitampura', agent: 'Metro News Agency', hawker: 'Pankaj Mishra', papers: ['Jagran'], monthlyBill: 180, balance: 360, subStatus: 'PAUSED', payStatus: 'PAID', joinDate: '20 Apr 2024' },
  { id: 'CST-006', name: 'Rajesh Sharma', phone: '9333444555', address: 'E-3, Laxmi Nagar', agent: 'Sunrise Depot', hawker: 'Vijay Singh', papers: ['TOI', 'Darpan'], monthlyBill: 275, balance: 275, subStatus: 'ACTIVE', payStatus: 'PAID', joinDate: '12 Dec 2023' },
];

const PAY_BADGE: Record<string, string> = {
  PAID: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  PENDING: 'bg-amber-50 text-amber-600 border-amber-100',
  OVERDUE: 'bg-rose-50 text-rose-600 border-rose-100',
};
const SUB_BADGE: Record<string, string> = {
  ACTIVE: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  PAUSED: 'bg-slate-100 text-slate-500 border-slate-200',
  CANCELLED: 'bg-rose-50 text-rose-600 border-rose-100',
};

export default function AdminCustomers() {
  const [customers] = useState<Customer[]>(MOCK);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.agent.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'ALL' || c.payStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.subStatus === 'ACTIVE').length,
    pending: customers.filter(c => c.payStatus === 'PENDING' || c.payStatus === 'OVERDUE').length,
    revenue: customers.reduce((s, c) => s + c.monthlyBill, 0),
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">USER_MANAGEMENT</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">MASTER_CUSTOMER_LIST</h1>
          </div>
          <div className="flex gap-3">
            {['ALL', 'PAID', 'PENDING', 'OVERDUE'].map(f => (
              <button key={f} onClick={() => setFilterStatus(f)}
                className={cn("px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                  filterStatus === f ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100' : 'bg-white text-slate-400 border-slate-200')}>
                {f}
              </button>
            ))}
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TOTAL_CUSTOMERS', value: stats.total, cls: 'bg-indigo-50 text-indigo-600' },
            { label: 'ACTIVE_SUBS', value: stats.active, cls: 'bg-emerald-50 text-emerald-600' },
            { label: 'PENDING_BILLS', value: stats.pending, cls: 'bg-amber-50 text-amber-600' },
            { label: 'MONTHLY_REVENUE', value: `₹${stats.revenue.toLocaleString()}`, cls: 'bg-violet-50 text-violet-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.cls)}><Users size={18} /></div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-900 italic">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="SEARCH BY NAME, PHONE OR AGENT..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none focus:ring-2 focus:ring-indigo-600" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[950px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-5">Customer</th>
                  <th className="px-6 py-5">Agent / Hawker</th>
                  <th className="px-6 py-5">Papers</th>
                  <th className="px-6 py-5 text-right">Monthly Bill</th>
                  <th className="px-6 py-5 text-center">Subscription</th>
                  <th className="px-6 py-5 text-center">Payment</th>
                  <th className="px-8 py-5 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black italic text-lg shrink-0">{c.name[0]}</div>
                        <div>
                          <p className="font-black text-slate-900 uppercase italic text-sm tracking-tight">{c.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{c.phone} · {c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-[10px] font-black text-indigo-600 uppercase">{c.agent}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase">{c.hawker}</p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-1">
                        {c.papers.map(p => (
                          <span key={p} className="text-[8px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 uppercase">{p}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right font-black text-slate-900 italic">₹{c.monthlyBill}</td>
                    <td className="px-6 py-6 text-center">
                      <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", SUB_BADGE[c.subStatus])}>{c.subStatus}</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", PAY_BADGE[c.payStatus])}>{c.payStatus}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => setSelected(c)} className="w-9 h-9 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all ml-auto">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Users className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No customers match.</p>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">CUSTOMER_PROFILE</h2>
              <button onClick={() => setSelected(null)}><X size={24} className="text-slate-300 hover:text-slate-900" /></button>
            </div>
            <div className="flex items-center gap-4 p-5 bg-indigo-50 rounded-3xl mb-6">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl italic shadow-lg">{selected.name[0]}</div>
              <div>
                <p className="font-black text-slate-900 uppercase italic tracking-tight">{selected.name}</p>
                <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{selected.id} · Joined {selected.joinDate}</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {[
                [Phone, selected.phone],
                [MapPin, selected.address],
                [Users, `Agent: ${selected.agent}`],
                [Newspaper, `Papers: ${selected.papers.join(', ')}`],
              ].map(([Icon, val], i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Icon size={14} className="text-slate-400 shrink-0" />
                  <span className="text-xs font-black text-slate-700 uppercase">{val as string}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Monthly Bill</p>
                <p className="font-black text-slate-900 italic">₹{selected.monthlyBill}</p>
              </div>
              <div className="p-4 rounded-2xl text-center border">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Balance</p>
                <p className={cn("font-black italic", selected.balance >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                  {selected.balance >= 0 ? '+' : ''}₹{selected.balance}
                </p>
              </div>
              <div className={cn("p-4 rounded-2xl text-center border", PAY_BADGE[selected.payStatus])}>
                <p className="text-[8px] font-black uppercase mb-1">Payment</p>
                <p className="font-black italic">{selected.payStatus}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
