"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Bike, Plus, Search, MapPin, Users, Star, Eye, X, CheckCircle2, XCircle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Hawker {
  id: string; name: string; phone: string; agentName: string;
  area: string; customers: number; rating: number;
  deliveries: number; status: 'ACTIVE' | 'INACTIVE'; joinDate: string;
}

const MOCK: Hawker[] = [
  { id: 'HWK-001', name: 'Ramesh Yadav', phone: '9876543211', agentName: 'Sita Ram Agency', area: 'Rohini Sector 4', customers: 45, rating: 4.9, deliveries: 1200, status: 'ACTIVE', joinDate: '10 Feb 2024' },
  { id: 'HWK-002', name: 'Sunil Verma', phone: '9988001122', agentName: 'Sita Ram Agency', area: 'Rohini Sector 7', customers: 38, rating: 4.6, deliveries: 980, status: 'ACTIVE', joinDate: '01 Apr 2024' },
  { id: 'HWK-003', name: 'Arun Sharma', phone: '9111222333', agentName: 'Raj Enterprises', area: 'Dwarka Sec 10', customers: 52, rating: 4.8, deliveries: 1450, status: 'ACTIVE', joinDate: '15 Jan 2024' },
  { id: 'HWK-004', name: 'Deepak Kumar', phone: '9222333444', agentName: 'Metro News Agency', area: 'Pitampura Block A', customers: 29, rating: 4.2, deliveries: 600, status: 'INACTIVE', joinDate: '20 Jul 2024' },
  { id: 'HWK-005', name: 'Pankaj Mishra', phone: '9333444555', agentName: 'Metro News Agency', area: 'Pitampura Block C', customers: 41, rating: 4.7, deliveries: 1100, status: 'ACTIVE', joinDate: '05 Mar 2024' },
  { id: 'HWK-006', name: 'Vijay Singh', phone: '9444555666', agentName: 'Sunrise Depot', area: 'Laxmi Nagar Main', customers: 63, rating: 5.0, deliveries: 1800, status: 'ACTIVE', joinDate: '12 Dec 2023' },
];

export default function AdminHawkers() {
  const [hawkers, setHawkers] = useState<Hawker[]>(MOCK);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Hawker | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', agentName: '', area: '' });

  const filtered = hawkers.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.area.toLowerCase().includes(search.toLowerCase()) ||
    h.agentName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) =>
    setHawkers(prev => prev.map(h => h.id === id ? { ...h, status: h.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : h));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setHawkers(prev => [{ id: `HWK-00${prev.length + 1}`, ...form, customers: 0, rating: 0, deliveries: 0, status: 'ACTIVE', joinDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }, ...prev]);
    setShowAdd(false);
    setForm({ name: '', phone: '', agentName: '', area: '' });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">ADMIN_CONTROL</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">HAWKER_DATABASE</h1>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all">
            <Plus size={16} /> ADD_HAWKER
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TOTAL_HAWKERS', value: hawkers.length, cls: 'bg-indigo-50 text-indigo-600' },
            { label: 'ACTIVE', value: hawkers.filter(h => h.status === 'ACTIVE').length, cls: 'bg-emerald-50 text-emerald-600' },
            { label: 'TOTAL_DELIVERIES', value: hawkers.reduce((s, h) => s + h.deliveries, 0).toLocaleString(), cls: 'bg-amber-50 text-amber-600' },
            { label: 'AVG_RATING', value: (hawkers.reduce((s, h) => s + h.rating, 0) / hawkers.length).toFixed(1), cls: 'bg-rose-50 text-rose-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.cls)}><Bike size={18} /></div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-900 italic">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="SEARCH BY NAME, AREA OR AGENT..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none focus:ring-2 focus:ring-indigo-600" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(h => (
            <div key={h.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Bike size={22} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 uppercase italic tracking-tight">{h.name}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{h.id}</p>
                  </div>
                </div>
                <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                  h.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100')}>
                  {h.status}
                </span>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                  <MapPin size={11} className="text-indigo-400" /> {h.area}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                  <Users size={11} className="text-violet-400" /> Agent: {h.agentName}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex gap-4">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Customers</p>
                    <p className="font-black text-slate-900 italic">{h.customers}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Deliveries</p>
                    <p className="font-black text-slate-900 italic">{h.deliveries.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Rating</p>
                    <p className="font-black text-amber-500 italic flex items-center gap-1"><Star size={11} className="fill-amber-500" />{h.rating}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(h)} className="w-9 h-9 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <Bike className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No hawkers found.</p>
          </div>
        )}
      </main>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">ADD_HAWKER</h2>
              <button onClick={() => setShowAdd(false)}><X size={24} className="text-slate-300 hover:text-slate-900" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              {[['Full Name', 'name', 'text'], ['Phone', 'phone', 'tel'], ['Agent Name', 'agentName', 'text'], ['Area', 'area', 'text']].map(([label, key, type]) => (
                <div key={key} className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">{label}</p>
                  <input type={type} required placeholder={label.toUpperCase()} value={form[key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
              ))}
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-xl mt-4 hover:bg-slate-900 transition-all">REGISTER_HAWKER</button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-2xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">HAWKER_PROFILE</h2>
              <button onClick={() => setSelected(null)}><X size={24} className="text-slate-300 hover:text-slate-900" /></button>
            </div>
            <div className="flex items-center gap-4 p-5 bg-emerald-50 rounded-3xl mb-6">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Bike size={22} /></div>
              <div>
                <p className="font-black text-slate-900 uppercase italic tracking-tight">{selected.name}</p>
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{selected.id} · {selected.joinDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[['Customers', selected.customers], ['Deliveries', selected.deliveries.toLocaleString()], ['Rating', selected.rating]].map(([l, v], i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase">{l}</p>
                  <p className="text-lg font-black text-slate-900 italic">{v}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                <span className="text-xs font-black text-slate-700 uppercase">{selected.area}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Users size={14} className="text-slate-400 shrink-0" />
                <span className="text-xs font-black text-slate-700 uppercase">{selected.agentName}</span>
              </div>
            </div>
            <button onClick={() => { toggleStatus(selected.id); setSelected(null); }}
              className={cn("w-full py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase mt-6 transition-all border",
                selected.status === 'ACTIVE'
                  ? 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white'
                  : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white')}>
              {selected.status === 'ACTIVE' ? 'DEACTIVATE_HAWKER' : 'REACTIVATE_HAWKER'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
