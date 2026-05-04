import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { BarChart3, Download, Calendar } from 'lucide-react';

export default function AdminReports() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">ANALYTICS_CORE</p>
            <h1 className="text-2xl font-bold tracking-tight">SYSTEM_REPORTS</h1>
          </div>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-md">
            <Download size={16} /> EXPORT_DATA
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card h-64 flex flex-col items-center justify-center border-dashed border-2">
            <BarChart3 className="text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center px-4">
              Revenue Growth Charts will appear here once data starts flowing.
            </p>
          </div>
          <div className="card h-64 flex flex-col items-center justify-center border-dashed border-2">
            <Calendar className="text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center px-4">
              Agent Performance Matrix: Processing...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
