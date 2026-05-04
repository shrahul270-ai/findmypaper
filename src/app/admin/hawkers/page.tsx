import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Bike, Plus, Search } from 'lucide-react';

export default function AdminHawkers() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">ADMIN_CONTROL: HAWKERS</p>
            <h1 className="text-2xl font-bold tracking-tight">HAWKER_DATABASE</h1>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-md">
            <Plus size={16} /> ADD_NEW_HAWKER
          </button>
        </header>

        <div className="card text-center py-20 border-2 border-dashed border-slate-100 rounded-xl">
          <Bike className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="text-slate-400 font-medium">Hawker management module active. Loading data...</p>
        </div>
      </main>
    </div>
  );
}
