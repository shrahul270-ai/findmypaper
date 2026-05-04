import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { CreditCard, FileText, Download } from 'lucide-react';

export default function AdminBilling() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="ADMIN" />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">FINANCE_HUB: BILLING</p>
            <h1 className="text-2xl font-bold tracking-tight">BILLING_OPERATIONS</h1>
          </div>
          <div className="flex gap-2">
            <button className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-lg font-bold text-xs">PREVIEW_ALL</button>
            <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-md">GENERATE_BILLS</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FileText size={20} /></div>
              <h3 className="font-bold text-sm uppercase tracking-wider">MONTHLY_SUMMARY</h3>
            </div>
            <p className="text-2xl font-black">₹4,52,390</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">TOTAL_EXPECTED_COLLECTION</p>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CreditCard size={20} /></div>
              <h3 className="font-bold text-sm uppercase tracking-wider">COLLECTED_TO_DATE</h3>
            </div>
            <p className="text-2xl font-black">₹2,10,000</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">46% OF TARGET</p>
          </div>
        </div>
      </main>
    </div>
  );
}
