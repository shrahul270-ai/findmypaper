"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Users, Search, UserPlus, Eye, X, Phone, MapPin, 
  Newspaper, CheckCircle2, Clock, AlertCircle, 
  Pause, MessageCircle, Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Customer {
  id: string; name: string; phone: string; address: string;
  hawker: string; papers: string[]; monthlyBill: number;
  balance: number; subStatus: 'ACTIVE' | 'PAUSED';
  payStatus: 'PAID' | 'PENDING' | 'OVERDUE'; joinDate: string;
}

const MOCK: Customer[] = [
  { id: 'CST-001', name: 'Anil Mehta', phone: '9876543210', address: 'A-12, Rohini Sec 4', hawker: 'Ramesh Yadav', papers: ['TOI', 'Bhaskar'], monthlyBill: 450, balance: 450, subStatus: 'ACTIVE', payStatus: 'PAID', joinDate: '15 Jan 2024' },
  { id: 'CST-002', name: 'Priya Dhar', phone: '9988776655', address: 'B-5, Rohini Sec 7', hawker: 'Ramesh Yadav', papers: ['TOI'], monthlyBill: 180, balance: -180, subStatus: 'ACTIVE', payStatus: 'PENDING', joinDate: '10 Feb 2024' },
  { id: 'CST-003', name: 'Suresh Kumar', phone: '9555666777', address: 'C-22, Rohini Sec 4', hawker: 'Sunil Verma', papers: ['Amar Ujala', 'Champak'], monthlyBill: 230, balance: 0, subStatus: 'ACTIVE', payStatus: 'PAID', joinDate: '05 Mar 2024' },
  { id: 'CST-004', name: 'Daily Store Rohini', phone: '9111222333', address: 'Shop 4, Main Mkt', hawker: 'Sunil Verma', papers: ['ET', 'HT', 'TOI'], monthlyBill: 1200, balance: -1200, subStatus: 'ACTIVE', payStatus: 'OVERDUE', joinDate: '01 Sep 2023' },
  { id: 'CST-005', name: 'Meena Gupta', phone: '9222333444', address: 'D-8, Rohini Sec 7', hawker: 'Ramesh Yadav', papers: ['Jagran'], monthlyBill: 180, balance: 360, subStatus: 'PAUSED', payStatus: 'PAID', joinDate: '20 Apr 2024' },
  { id: 'CST-006', name: 'Rajesh Sharma', phone: '9333444555', address: 'E-3, Rohini Sec 4', hawker: 'Sunil Verma', papers: ['TOI', 'Darpan'], monthlyBill: 275, balance: 275, subStatus: 'ACTIVE', payStatus: 'PAID', joinDate: '12 Dec 2023' },
];

const PAY: Record<string, string> = {
  PAID: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  PENDING: 'bg-amber-50 text-amber-600 border-amber-100',
  OVERDUE: 'bg-rose-50 text-rose-600 border-rose-100',
};
const PAY_ICON: Record<string, React.ReactNode> = {
  PAID: <CheckCircle2 size={12} />,
  PENDING: <Clock size={12} />,
  OVERDUE: <AlertCircle size={12} />,
};

export default function AgentCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(MOCK);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', hawker: 'Ramesh Yadav', papers: '' });

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.address.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'ALL' || c.payStatus === filter;
    return matchSearch && matchFilter;
  });

  const togglePause = (id: string) =>
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, subStatus: c.subStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : c));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newC: Customer = {
      id: `CST-00${customers.length + 1}`,
      name: form.name, phone: form.phone, address: form.address,
      hawker: form.hawker,
      papers: form.papers.split(',').map(p => p.trim()).filter(Boolean),
      monthlyBill: 0, balance: 0, subStatus: 'ACTIVE', payStatus: 'PENDING',
      joinDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setCustomers(prev => [newC, ...prev]);
    setShowAdd(false);
    setForm({ name: '', phone: '', address: '', hawker: 'Ramesh Yadav', papers: '' });
  };

  const sendWhatsApp = (phone: string, name: string, amount: number) => {
    const msg = `*FINDMYPAPER BILLING REMINDER*\n\nDear ${name},\n\nYour bill of ₹${amount} is due. Please pay at the earliest.\n\nThank you!`;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="AGENT" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">DEPOT_CRM</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">CUSTOMER_DATABASE</h1>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all">
            <UserPlus size={16} /> NEW_SUBSCRIPTION
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TOTAL', value: customers.length, cls: 'bg-indigo-50 text-indigo-600' },
            { label: 'ACTIVE', value: customers.filter(c => c.subStatus === 'ACTIVE').length, cls: 'bg-emerald-50 text-emerald-600' },
            { label: 'PENDING_BILLS', value: customers.filter(c => c.payStatus !== 'PAID').length, cls: 'bg-amber-50 text-amber-600' },
            { label: 'MONTHLY_REVENUE', value: `₹${customers.reduce((s, c) => s + c.monthlyBill, 0).toLocaleString()}`, cls: 'bg-violet-50 text-violet-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.cls)}><Users size={18} /></div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-900 italic">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="SEARCH BY NAME, PHONE OR ADDRESS..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none focus:ring-2 focus:ring-indigo-600" />
          </div>
          <div className="flex gap-2">
            {['ALL', 'PAID', 'PENDING', 'OVERDUE'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn("px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                  filter === f ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-slate-400 border-slate-200')}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(c => (
            <div key={c.id} className={cn(
              "bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all group",
              c.payStatus === 'OVERDUE' ? 'border-rose-200 hover:border-rose-400' : 'border-slate-100 hover:border-indigo-100'
            )}>
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black italic text-xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {c.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 uppercase italic tracking-tight text-sm leading-none mb-1">{c.name}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{c.phone}</p>
                  </div>
                </div>
                <span className={cn("inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border", PAY[c.payStatus])}>
                  {PAY_ICON[c.payStatus]} {c.payStatus}
                </span>
              </div>

              {/* Address + Hawker */}
              <div className="space-y-1.5 mb-5">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                  <MapPin size={11} className="text-indigo-400 shrink-0" />
                  <span className="truncate">{c.address}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                  <Newspaper size={11} className="text-emerald-400 shrink-0" />
                  {c.papers.join(', ')}
                </div>
              </div>

              {/* Papers badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {c.papers.map(p => (
                  <span key={p} className="text-[8px] font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase">{p}</span>
                ))}
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase">Monthly Bill</p>
                  <p className="font-black text-slate-900 italic text-lg">₹{c.monthlyBill}</p>
                </div>
                <div className="flex gap-2">
                  {c.payStatus !== 'PAID' && (
                    <button onClick={() => sendWhatsApp(c.phone, c.name, c.monthlyBill)}
                      className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100">
                      <MessageCircle size={16} />
                    </button>
                  )}
                  <button onClick={() => { setSelected(c); }}
                    className="w-9 h-9 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <Users className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No customers found.</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">CUSTOMER_DETAIL</h2>
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
                [Newspaper, `Papers: ${selected.papers.join(', ')}`],
                [Users, `Hawker: ${selected.hawker}`],
              ].map(([Icon, val], i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Icon size={14} className="text-slate-400 shrink-0" />
                  <span className="text-xs font-black text-slate-700 uppercase">{val as string}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Monthly</p>
                <p className="font-black text-slate-900 italic">₹{selected.monthlyBill}</p>
              </div>
              <div className={cn("p-4 rounded-2xl text-center border", selected.balance >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100')}>
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Balance</p>
                <p className={cn("font-black italic", selected.balance >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                  {selected.balance >= 0 ? '+' : ''}₹{selected.balance}
                </p>
              </div>
              <div className={cn("p-4 rounded-2xl text-center border", selected.subStatus === 'ACTIVE' ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-100 border-slate-200')}>
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Status</p>
                <p className={cn("font-black italic text-xs", selected.subStatus === 'ACTIVE' ? 'text-indigo-600' : 'text-slate-500')}>{selected.subStatus}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => sendWhatsApp(selected.phone, selected.name, selected.monthlyBill)}
                className="flex-1 py-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2">
                <MessageCircle size={14} /> SEND_REMINDER
              </button>
              <button onClick={() => { togglePause(selected.id); setSelected(null); }}
                className={cn("flex-1 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase border transition-all flex items-center justify-center gap-2",
                  selected.subStatus === 'ACTIVE'
                    ? 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white'
                    : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-600 hover:text-white')}>
                <Pause size={14} /> {selected.subStatus === 'ACTIVE' ? 'PAUSE_SUB' : 'RESUME_SUB'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">NEW_SUBSCRIPTION</h2>
              <button onClick={() => setShowAdd(false)}><X size={24} className="text-slate-300 hover:text-slate-900" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              {[
                ['Customer Name', 'name', 'text'],
                ['Phone Number', 'phone', 'tel'],
                ['Address', 'address', 'text'],
                ['Papers (comma separated)', 'papers', 'text'],
              ].map(([label, key, type]) => (
                <div key={key} className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">{label}</p>
                  <input type={type} required placeholder={label.toUpperCase()} value={form[key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
              ))}
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Assign Hawker</p>
                <select value={form.hawker} onChange={e => setForm(p => ({ ...p, hawker: e.target.value }))}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase outline-none focus:ring-2 focus:ring-indigo-600">
                  <option>Ramesh Yadav</option>
                  <option>Sunil Verma</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-xl mt-4 hover:bg-slate-900 transition-all">
                ACTIVATE_SUBSCRIPTION
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
