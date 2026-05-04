"use client";

import React from 'react';
import { CreditCard, Upload, History, AlertCircle, CheckCircle, Smartphone, Download, MapPin, ReceiptText } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

export default function CustomerBilling() {
  const transactions = [
    { id: 'T1001', date: '01 May 2026', amount: 450, status: 'APPROVED', mode: 'ONLINE' },
    { id: 'T1002', date: '01 Apr 2026', amount: 420, status: 'APPROVED', mode: 'CASH' }
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="CUSTOMER" />
      
      <main className="flex-1 p-8">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">MEMBER_PORTAL: BILLING</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">MY_ACCOUNT_LEDGER</h1>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            <Download size={14} /> DOWNLOAD_INVOICE_PDF
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs font-bold opacity-80 mb-2 uppercase tracking-widest">TOTAL_DUE_AMOUNT</p>
                <h2 className="text-5xl font-black mb-6">₹450.00</h2>
                <div className="flex items-center gap-2 text-xs font-bold bg-white/20 w-fit px-4 py-2 rounded-full">
                  <AlertCircle size={14} />
                  DUE_BY: 10 MAY 2026
                </div>
              </div>
              <CreditCard className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
            </div>

            <div className="card border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-slate-700">
                <Smartphone size={18} className="text-indigo-600" />
                <h3 className="text-xs font-bold tracking-widest uppercase">PAY_VIA_UPI</h3>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 border-dashed">
                <div className="w-40 h-40 bg-white border border-slate-200 mx-auto rounded-xl flex items-center justify-center mb-3">
                  <span className="text-[10px] text-slate-400 font-mono italic">[QR_SCAN_CODE]</span>
                </div>
                <p className="text-xs font-bold text-slate-600">UPI ID: agency@okaxis</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form & History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-2 mb-6">
                <Upload size={20} className="text-indigo-600" />
                <h2 className="text-sm font-bold tracking-widest uppercase">UPLOAD_PAYMENT_PROOF</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">UTR_TRANSACTION_ID</label>
                  <input type="text" placeholder="12-digit UPI Reference" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">PAID_AMOUNT (₹)</label>
                  <input type="number" placeholder="450" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-100 rounded-[1.5rem] p-10 text-center hover:border-indigo-400 transition-all cursor-pointer group bg-slate-50/50">
                <Upload className="mx-auto text-slate-300 group-hover:text-indigo-500 mb-4 transition-all" size={40} />
                <p className="text-sm font-bold text-slate-600">Tap to upload your payment screenshot</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Max file size: 5MB (JPG, PNG)</p>
              </div>

              <button className="btn-primary w-full mt-8 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 h-14 uppercase tracking-widest">
                SUBMIT_PROOF_FOR_VERIFICATION
              </button>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-6">
                <History size={20} className="text-slate-400" />
                <h2 className="text-sm font-bold tracking-widest uppercase">RECENT_HISTORY</h2>
              </div>
              <div className="space-y-3">
                {transactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-white rounded-xl text-indigo-600 border border-slate-100">
                        <ReceiptText size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{t.date}</p>
                        <p className="text-[10px] text-green-600 font-bold tracking-widest uppercase flex items-center gap-1">
                          <CheckCircle size={10} /> {t.status} • {t.mode}
                        </p>
                      </div>
                    </div>
                    <p className="font-black text-slate-800">₹{t.amount}</p>
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
