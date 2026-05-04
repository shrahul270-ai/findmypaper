import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Wallet, ArrowUpRight, ArrowDownLeft, History, Landmark } from 'lucide-react';

export default function AgentWallet() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="AGENT" />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">FINANCE_CONTROL: WALLET</p>
          <h1 className="text-2xl font-bold tracking-tight">WALLET_SETTLEMENTS</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 bg-indigo-600 p-8 rounded-3xl text-white shadow-xl">
            <p className="text-xs font-bold opacity-80 mb-2 uppercase tracking-widest">CURRENT_BALANCE</p>
            <h2 className="text-4xl font-black mb-6">₹18,450.00</h2>
            <button className="bg-white text-indigo-600 w-full py-3 rounded-xl font-bold text-xs tracking-widest uppercase">
              REQUEST_WITHDRAWAL
            </button>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            <div className="card">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg w-fit mb-4"><ArrowUpRight size={20} /></div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">TOTAL_COLLECTED</h3>
              <p className="text-xl font-black text-slate-800 mt-1">₹4,50,000</p>
            </div>
            <div className="card">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg w-fit mb-4"><ArrowDownLeft size={20} /></div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">PENDING_SETTLEMENT</h3>
              <p className="text-xl font-black text-slate-800 mt-1">₹12,400</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <History className="text-slate-400" size={20} />
            <h2 className="text-sm font-bold tracking-widest uppercase">TRANSACTION_HISTORY</h2>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 text-indigo-600">
                    <Landmark size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 uppercase">Settlement to Bank - #TXN{1000 + i}</p>
                    <p className="text-[10px] text-slate-400 font-bold">04 MAY 2026</p>
                  </div>
                </div>
                <p className="font-bold text-sm text-red-600">- ₹5,000.00</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
