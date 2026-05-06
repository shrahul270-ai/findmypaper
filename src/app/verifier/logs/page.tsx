"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { History, Search, Download, Filter } from 'lucide-react';

export default function VerifierLogs() {
  const logs = [
    { id: 'LOG_001', action: 'APPROVED', user: 'Amit Verma', verifier: 'Rahul', time: '11:23 PM', amount: 450 },
    { id: 'LOG_002', action: 'REJECTED', user: 'Priya Dhar', verifier: 'Rahul', time: '11:16 PM', amount: 320 },
    { id: 'LOG_003', action: 'APPROVED', user: 'Suresh Kumar', verifier: 'Rahul', time: '10:05 PM', amount: 500 },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar role="VERIFIER" />
      <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full">
        <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1">Audit_Trail</p>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 italic tracking-tighter uppercase">PAYMENT_LOGS</h1>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase flex items-center gap-2 shadow-xl shadow-slate-200">
             <Download size={16} /> EXPORT_LOGS
          </button>
        </header>

        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                       <th className="px-8 py-5">Log_ID</th>
                       <th className="px-8 py-5">Action_Type</th>
                       <th className="px-8 py-5">Customer_Name</th>
                       <th className="px-8 py-5 text-right">Amount</th>
                       <th className="px-8 py-5 text-right">Timestamp</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {logs.map((log) => (
                       <tr key={log.id} className="hover:bg-slate-50/50 transition-all group">
                          <td className="px-8 py-6 text-xs font-bold text-slate-300">#{log.id}</td>
                          <td className="px-8 py-6">
                             <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase italic border ${
                               log.action === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                             }`}>
                                {log.action}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-slate-900 italic">{log.user}</td>
                          <td className="px-8 py-6 text-base font-black text-slate-900 text-right">₹{log.amount}</td>
                          <td className="px-8 py-6 text-[10px] font-bold text-slate-400 text-right uppercase tracking-widest">{log.time}</td>
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
