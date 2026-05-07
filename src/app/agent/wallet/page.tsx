"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, 
  History, Plus, CheckCircle2, AlertCircle, Clock,
  RefreshCw, DollarSign, Smartphone, ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AgentWallet() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const transactions = [
    { id: 'WT-001', type: 'TOPUP', amount: 5000, date: '05 May 2024', status: 'SUCCESS' },
    { id: 'WT-002', type: 'BILL_PAY', amount: 1200, date: '04 May 2024', status: 'SUCCESS' },
    { id: 'WT-003', type: 'COMMISSION', amount: 850, date: '03 May 2024', status: 'SUCCESS' },
    { id: 'WT-004', type: 'TOPUP', amount: 1000, date: '02 May 2024', status: 'FAILED' },
    { id: 'WT-005', type: 'REFUND', amount: 150, date: '01 May 2024', status: 'SUCCESS' },
  ];

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('PAYMENT_INITIATED: Redirecting to UPI gateway...');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="AGENT" />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-10">
          <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">VIRTUAL_TREASURY</p>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">MY_WALLET</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Wallet Control */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">AVAILABLE_BALANCE</p>
                    <p className="text-5xl font-black italic tracking-tighter">₹18,450.00</p>
                  </div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:rotate-12 transition-all">
                    <Wallet size={28} className="text-indigo-400" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">THIS_MONTH_SPENT</p>
                    <p className="text-lg font-black italic">₹12,400</p>
                  </div>
                  <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">TOTAL_RECHARGE</p>
                    <p className="text-lg font-black italic">₹45,000</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600 rounded-full blur-[80px] opacity-10 -ml-24 -mb-24"></div>
            </div>

            {/* Quick Add Money */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-sm font-black text-slate-900 italic uppercase tracking-widest mb-6 flex items-center gap-2">
                <Plus size={16} className="text-indigo-600" /> ADD_MONEY_TO_WALLET
              </h2>
              <form onSubmit={handleTopup} className="space-y-6">
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300">₹</span>
                  <input 
                    type="number" 
                    placeholder="ENTER AMOUNT"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-3xl text-2xl font-black italic outline-none focus:ring-4 focus:ring-indigo-50 transition-all placeholder:text-slate-200"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['500', '1000', '5000'].map(val => (
                    <button 
                      key={val} 
                      type="button"
                      onClick={() => setAmount(val)}
                      className="py-3 bg-slate-50 hover:bg-indigo-50 border border-slate-100 rounded-xl text-xs font-black text-slate-600 hover:text-indigo-600 transition-all uppercase"
                    >
                      +₹{val}
                    </button>
                  ))}
                </div>
                <button 
                  type="submit" 
                  disabled={loading || !amount}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <RefreshCw className="animate-spin" size={18} /> : <><CreditCard size={18} /> PROCEED_TO_PAY</>}
                </button>
              </form>
            </div>
          </div>

          {/* Right Sidebar: History */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <History size={14} /> RECENT_ACTIVITY
                </h2>
                <button className="text-[9px] font-black text-indigo-600 uppercase hover:underline">VIEW_ALL</button>
              </div>
              <div className="space-y-4">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                        tx.type === 'TOPUP' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      )}>
                        {tx.type === 'TOPUP' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-900 uppercase italic tracking-tight">{tx.type.replace('_', ' ')}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-sm font-black italic tracking-tight",
                        tx.type === 'TOPUP' ? 'text-emerald-600' : 'text-rose-600'
                      )}>
                        {tx.type === 'TOPUP' ? '+' : '-'}₹{tx.amount}
                      </p>
                      <p className={cn(
                        "text-[7px] font-black uppercase tracking-widest",
                        tx.status === 'SUCCESS' ? 'text-emerald-500' : 'text-rose-500'
                      )}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-emerald-600">
                <ShieldCheck size={20} />
                <h3 className="text-[10px] font-black uppercase tracking-widest">PAYMENT_SECURED</h3>
              </div>
              <p className="text-[9px] font-bold text-emerald-700 uppercase leading-relaxed mb-4 italic">Your payments are protected by 256-bit encryption and secure UPI gateway. Contact support for any failed transactions.</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase">
                <Smartphone size={14} /> 24/7 SUPPORT_ENABLED
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
