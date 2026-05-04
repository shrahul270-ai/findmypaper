import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Store, Plus, Search } from 'lucide-react';

export default function AdminAgents() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">ADMIN_CONTROL: AGENTS</p>
            <h1 className="text-2xl font-bold tracking-tight">AGENT_REGISTRY</h1>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-md">
            <Plus size={16} /> ADD_NEW_AGENT
          </button>
        </header>

        <div className="card">
          <div className="flex items-center gap-2 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <Search className="text-slate-400" size={18} />
            <input type="text" placeholder="Search agents by name or area..." className="bg-transparent outline-none text-sm w-full" />
          </div>
          <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-xl">
            <Store className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-medium">No agents found. Start by adding your first distribution partner.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
