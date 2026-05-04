import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Users, Search, Filter } from 'lucide-react';

export default function AdminCustomers() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">USER_MANAGEMENT: CUSTOMERS</p>
            <h1 className="text-2xl font-bold tracking-tight">MASTER_CUSTOMER_LIST</h1>
          </div>
        </header>

        <div className="card">
          <div className="flex gap-4 mb-8">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Search className="text-slate-400" size={18} />
              <input type="text" placeholder="Search by name, phone or address..." className="bg-transparent outline-none text-sm w-full" />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50">
              <Filter size={16} /> FILTERS
            </button>
          </div>

          <div className="text-center py-20">
            <Users className="mx-auto text-slate-100 mb-4" size={64} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">CONNECTING_TO_DATABASE...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
