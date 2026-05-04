import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Users, Search, UserPlus } from 'lucide-react';

export default function AgentCustomers() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="AGENT" />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">DEPOT_CRM: CUSTOMERS</p>
            <h1 className="text-2xl font-bold tracking-tight">CUSTOMER_DATABASE</h1>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold text-xs">
            <UserPlus size={16} /> NEW_SUBSCRIPTION
          </button>
        </header>

        <div className="card">
          <div className="flex items-center gap-2 mb-8 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <Search className="text-slate-400" size={18} />
            <input type="text" placeholder="Search by name, address or flat number..." className="bg-transparent outline-none text-sm w-full" />
          </div>
          <div className="text-center py-20">
            <Users className="mx-auto text-slate-100 mb-4" size={64} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Customer records under your depot will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
