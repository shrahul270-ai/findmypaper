import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Bike, Plus, Search, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AgentHawkers() {
  const hawkers = [
    { name: 'Ramesh Yadav', area: 'Sector 4', customers: 120, status: 'ACTIVE' },
    { name: 'Amit Singh', area: 'Main Market', customers: 85, status: 'ACTIVE' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="AGENT" />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">DEPOT_MANAGEMENT: MY_TEAM</p>
            <h1 className="text-2xl font-bold tracking-tight">HAWKER_ROSTER</h1>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold text-xs">
            <Plus size={16} /> ADD_HAWKER
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hawkers.map((h, i) => (
            <div key={i} className="card hover:border-indigo-500 transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-indigo-600">
                  <Bike size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{h.name}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                    <MapPin size={10} /> {h.area}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-slate-50 pt-4">
                <div>
                  <p className="text-xs font-bold text-slate-400">CUSTOMERS</p>
                  <p className="text-xl font-black text-indigo-600">{h.customers}</p>
                </div>
                <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[9px] font-bold border border-green-100 uppercase">
                  {h.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
