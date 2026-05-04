import React from 'react';
import { CreditCard, Upload, History, AlertCircle, CheckCircle, Smartphone } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

export default function CustomerBilling() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8">
        <header className="mb-8">
          <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">MEMBER_PORTAL: BILLING</p>
          <h1 className="text-2xl font-bold tracking-tight">MY_ACCOUNT_LEDGER</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Bill Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs font-bold opacity-80 mb-2 uppercase tracking-widest">TOTAL_DUE_AMOUNT</p>
                <h2 className="text-5xl font-black mb-6">₹450.00</h2>
                <div className="flex items-center gap-2 text-xs font-bold bg-white/20 w-fit px-3 py-1.5 rounded-full">
                  <AlertCircle size={14} />
                  DUE_BY: 10 MAY 2026
                </div>
              </div>
              <CreditCard className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
            </div>

            <div className="card">
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4">PAYMENT_CHANNELS</h3>
              <div className="space-y-3">
                <div className="p-4 border border-[var(--divider)] rounded-xl flex items-center justify-between hover:border-indigo-500 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">UPI / G-PAY / PHONEPE</p>
                      <p className="text-[10px] text-[var(--muted)]">agency@upi</p>
                    </div>
                  </div>
                  <CheckCircle size={18} className="text-green-500" />
                </div>
                {/* QR Code Placeholder */}
                <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 text-center">
                  <p className="text-[10px] font-bold text-slate-500 mb-2">SCAN_TO_PAY</p>
                  <div className="w-32 h-32 bg-white border border-slate-200 mx-auto rounded-lg flex items-center justify-center">
                    <span className="text-[10px] text-slate-400 font-mono">[QR_CODE]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Upload Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-6 text-indigo-600">
                <Upload size={20} />
                <h2 className="text-sm font-bold tracking-widest uppercase">UPLOAD_PAYMENT_PROOF</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--muted)] uppercase">TRANSACTION_UTR_NUMBER</label>
                  <input 
                    type="text" 
                    placeholder="12-digit UTR Code" 
                    className="w-full px-4 py-3 bg-slate-50 border border-[var(--divider)] rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--muted)] uppercase">PAYMENT_AMOUNT</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount paid" 
                    className="w-full px-4 py-3 bg-slate-50 border border-[var(--divider)] rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-[10px] font-bold text-[var(--muted)] uppercase mb-2 block">SCREENSHOT_UPLOAD</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-indigo-400 transition-all cursor-pointer group">
                  <Upload className="mx-auto text-slate-300 group-hover:text-indigo-500 mb-4 transition-all" size={48} />
                  <p className="text-sm font-bold text-slate-600">Click to upload screenshot</p>
                  <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, Max 5MB</p>
                </div>
              </div>

              <button className="btn-primary w-full mt-8 flex items-center justify-center gap-2">
                SUBMIT_FOR_VERIFICATION
              </button>
            </div>

            {/* Payment History */}
            <div className="card">
              <div className="flex items-center gap-2 mb-6">
                <History size={20} className="text-slate-400" />
                <h2 className="text-sm font-bold tracking-widest uppercase">RECENT_TRANSACTIONS</h2>
              </div>
              <div className="space-y-3">
                {[
                  { date: '01 Apr 2026', amount: 450, status: 'APPROVED' },
                  { date: '01 Mar 2026', amount: 420, status: 'APPROVED' }
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-700">Monthly Bill - {t.date}</p>
                      <p className="text-[10px] text-green-600 font-bold tracking-tighter">VERIFIED_&_SETTLED</p>
                    </div>
                    <p className="font-bold text-sm text-slate-800">₹{t.amount}.00</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
