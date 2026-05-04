"use client";

import React, { useState } from 'react';
import { Check, X, Eye, ShieldCheck, Search, Filter, Image as ImageIcon, User, Building2, Bike } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

export default function VerifierDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const pendingPayments = [
    { 
      id: 'PAY-8821', 
      customerId: 'CUST-1042', 
      customerName: 'Amit Verma', 
      agency: 'Sita Ram Agency', 
      hawker: 'Ramesh Yadav',
      amount: 450, 
      date: '05 May 2026', 
      utr: '123456789012',
      phone: '9876543210'
    },
    { 
      id: 'PAY-8822', 
      customerId: 'CUST-1056', 
      customerName: 'Priya Dhar', 
      agency: 'Metro News', 
      hawker: 'Amit Singh',
      amount: 320, 
      date: '04 May 2026', 
      utr: '987654321098',
      phone: '9988776655'
    }
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">ACCOUNTING_PORTAL: VERIFIER</p>
            <h1 className="text-2xl font-bold tracking-tight">PAYMENT_AUDIT_TERMINAL</h1>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by Name, Phone, UTR..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm"
              />
            </div>
            <button className="bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={20} className="text-slate-400" />
            </button>
          </div>
        </header>

        <div className="card p-0 overflow-hidden shadow-xl shadow-slate-200/50">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" size={20} />
              <h2 className="text-xs font-bold tracking-widest uppercase">APPROVAL_QUEUE</h2>
            </div>
            <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-1 rounded tracking-widest">
              {pendingPayments.length} PENDING
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] uppercase font-bold tracking-[0.1em] text-slate-400 bg-slate-50/30">
                  <th className="px-6 py-4">CUSTOMER_DATA</th>
                  <th className="px-6 py-4">HIERARCHY_LINK</th>
                  <th className="px-6 py-4">TRANSACTION_DETAILS</th>
                  <th className="px-6 py-4">PROOF</th>
                  <th className="px-6 py-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pendingPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 text-sm leading-none mb-1">{pay.customerName}</p>
                      <p className="text-[10px] text-indigo-600 font-mono font-bold uppercase">{pay.customerId}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{pay.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Building2 size={12} className="text-slate-400" /> {pay.agency}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
                          <Bike size={12} className="text-slate-400" /> {pay.hawker}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-lg font-black text-slate-800 leading-none">₹{pay.amount}</p>
                      <p className="text-[9px] font-mono text-slate-400 mt-1 uppercase">UTR: {pay.utr}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg font-bold text-[10px] uppercase hover:bg-indigo-600 hover:text-white transition-all">
                        <ImageIcon size={14} /> VIEW_SCREENSHOT
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-100" title="Reject Payment">
                          <X size={18} />
                        </button>
                        <button className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all border border-green-100" title="Approve & Credit Agent">
                          <Check size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
