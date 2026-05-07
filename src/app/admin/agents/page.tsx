"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Store, Plus, Search, MapPin, Phone, Mail, Users, Wallet, UserCheck, Eye, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Agent {
  id: string; name: string; phone: string; email: string;
  area: string; city: string; hawkers: number; customers: number;
  wallet: number; status: 'ACTIVE' | 'INACTIVE'; joinDate: string;
}

const MOCK: Agent[] = [
  { id: 'AGT-001', name: 'Sita Ram Agency', phone: '9876543210', email: 'sitaram@fmp.com', area: 'Rohini', city: 'Delhi', hawkers: 8, customers: 340, wallet: 18450, status: 'ACTIVE', joinDate: '12 Jan 2024' },
  { id: 'AGT-002', name: 'Raj Enterprises', phone: '9988776655', email: 'raj@fmp.com', area: 'Dwarka', city: 'Delhi', hawkers: 5, customers: 210, wallet: 9200, status: 'ACTIVE', joinDate: '05 Mar 2024' },
  { id: 'AGT-003', name: 'Kumar Distribution', phone: '9555666777', email: 'kumar@fmp.com', area: 'Janakpuri', city: 'Delhi', hawkers: 3, customers: 120, wallet: 4100, status: 'INACTIVE', joinDate: '20 Jun 2024' },
  { id: 'AGT-004', name: 'Metro News Agency', phone: '9444333222', email: 'metro@fmp.com', area: 'Pitampura', city: 'Delhi', hawkers: 10, customers: 480, wallet: 32000, status: 'ACTIVE', joinDate: '01 Sep 2023' },
  { id: 'AGT-005', name: 'Sunrise Depot', phone: '9333111222', email: 'sunrise@fmp.com', area: 'Laxmi Nagar', city: 'Delhi', hawkers: 6, customers: 290, wallet: 12300, status: 'ACTIVE', joinDate: '15 Nov 2023' },
];

export default function AdminAgents() {
  const [agents, setAgents] = useState<Agent[]>(MOCK);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Agent | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', area: '', city: '' });

  const filtered = agents.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.area.toLowerCase().includes(search.toLowerCase()) ||
    a.phone.includes(search)
  );

  const toggleStatus = (id: string) =>
    setAgents(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : a));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAgents(prev => [{ id: `AGT-00${prev.length + 1}`, ...form, hawkers: 0, customers: 0, wallet: 0, status: 'ACTIVE', joinDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }, ...prev]);
    setShowAdd(false);
    setForm({ name: '', phone: '', email: '', area: '', city: '' });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">ADMIN_CONTROL</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">AGENT_REGISTRY</h1>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all">
            <Plus size={16} /> ADD_NEW_AGENT
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TOTAL_AGENTS', value: agents.length, color: 'bg-indigo-50 text-indigo-600', icon: Store },
            { label: 'ACTIVE', value: agents.filter(a => a.status === 'ACTIVE').length, color: 'bg-emerald-50 text-emerald-600', icon: UserCheck },
            { label: 'TOTAL_CUSTOMERS', value: agents.reduce((s, a) => s + a.customers, 0).toLocaleString(), color: 'bg-violet-50 text-violet-600', icon: Users },
            { label: 'WALLET_POOL', value: `₹${(agents.reduce((s, a) => s + a.wallet, 0) / 1000).toFixed(1)}K`, color: 'bg-amber-50 text-amber-600', icon: Wallet },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.color)}><s.icon size={18} /></div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-900 italic">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="SEARCH BY NAME, AREA OR PHONE..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none focus:ring-2 focus:ring-indigo-600" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[850px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-5">Agent Profile</th>
                  <th className="px-6 py-5">Area</th>
                  <th className="px-6 py-5 text-center">Hawkers</th>
                  <th className="px-6 py-5 text-center">Customers</th>
                  <th className="px-6 py-5 text-right">Wallet</th>
                  <th className="px-6 py-5 text-center">Status</th>
                  <th className="px-8 py-5 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(agent => (
                  <tr key={agent.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black italic text-lg shrink-0">{agent.name[0]}</div>
                        <div>
                          <p className="font-black text-slate-900 uppercase italic text-sm tracking-tight">{agent.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{agent.phone} · {agent.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase">
                        <MapPin size={12} className="text-indigo-400" />{agent.area}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center font-black text-slate-900 italic">{agent.hawkers}</td>
                    <td className="px-6 py-6 text-center font-black text-slate-900 italic">{agent.customers}</td>
                    <td className="px-6 py-6 text-right font-black text-slate-900 italic">₹{agent.wallet.toLocaleString()}</td>
                    <td className="px-6 py-6 text-center">
                      <button onClick={() => toggleStatus(agent.id)}
                        className={cn("text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all",
                          agent.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100'
                            : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100')}>
                        {agent.status}
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => setSelected(agent)}
                        className="w-9 h-9 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all ml-auto">
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
              <Store className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No agents found.</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">ADD_AGENT</h2>
              <button onClick={() => setShowAdd(false)}><X size={24} className="text-slate-300 hover:text-slate-900" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              {[['Agency Name', 'name', 'text'], ['Phone', 'phone', 'tel'], ['Email', 'email', 'email'], ['Area', 'area', 'text'], ['City', 'city', 'text']].map(([label, key, type]) => (
                <div key={key} className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">{label}</p>
                  <input type={type} required placeholder={label.toUpperCase()}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
              ))}
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-xl mt-4 hover:bg-slate-900 transition-all">
                REGISTER_AGENT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-2xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">AGENT_PROFILE</h2>
              <button onClick={() => setSelected(null)}><X size={24} className="text-slate-300 hover:text-slate-900" /></button>
            </div>
            <div className="flex items-center gap-4 p-5 bg-indigo-50 rounded-3xl mb-6">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl italic shadow-lg">{selected.name[0]}</div>
              <div>
                <p className="font-black text-slate-900 uppercase italic tracking-tight">{selected.name}</p>
                <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{selected.id}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                [Phone, selected.phone], [Mail, selected.email],
                [MapPin, `${selected.area}, ${selected.city}`],
                [Users, `${selected.hawkers} Hawkers · ${selected.customers} Customers`],
                [Wallet, `₹${selected.wallet.toLocaleString()} Balance`],
              ].map(([Icon, val], i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Icon size={14} className="text-slate-400 shrink-0" />
                  <span className="text-xs font-black text-slate-700 uppercase">{val as string}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { toggleStatus(selected.id); setSelected(null); }}
              className={cn("w-full py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase mt-6 transition-all border",
                selected.status === 'ACTIVE'
                  ? 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white'
                  : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white')}>
              {selected.status === 'ACTIVE' ? 'DEACTIVATE_AGENT' : 'REACTIVATE_AGENT'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
