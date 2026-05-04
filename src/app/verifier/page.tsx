import React from 'react';
import { Check, X, Eye, ShieldCheck, Search, Filter, Image as ImageIcon } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

export default function VerifierDashboard() {
  const pendingPayments = [
    { id: 'PAY-8821', customer: 'Amit Verma', agent: 'Sita Ram Agency', amount: 450, date: '05 May 2026', utr: '123456789012' },
    { id: 'PAY-8822', customer: 'Priya Dhar', agent: 'Sita Ram Agency', amount: 320, date: '04 May 2026', utr: '987654321098' },
    { id: 'PAY-8823', customer: 'Rajesh Khanna', agent: 'Metro News', amount: 500, date: '04 May 2026', utr: '112233445566' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-indigo-600 text-[10px] font-bold tracking-[0.2em] uppercase">VERIFICATION_TERMINAL</p>
            <h1 className="text-2xl font-bold tracking-tight">PENDING_SETTLEMENTS</h1>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search Transaction ID / UTR..." 
                className="pl-10 pr-4 py-2 border border-[var(--divider)] rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none w-64"
              />
            </div>
            <button className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--divider)] px-4 py-2 rounded-lg font-bold text-xs hover:bg-[var(--surface-2)]">
              <Filter size={16} />
              FILTER
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="card p-0 overflow-hidden">
            <div className="p-5 border-b border-[var(--divider)] bg-[var(--surface-2)] flex justify-between items-center">
              <div className="flex items-center gap-2 text-indigo-600">
                <ShieldCheck size={18} />
                <h2 className="text-xs font-bold tracking-widest uppercase">APPROVAL_QUEUE</h2>
              </div>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{pendingPayments.length} REQUESTS</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--divider)] text-[10px] uppercase font-bold tracking-widest text-[var(--muted)]">
                    <th className="px-6 py-4">TRANSACTION_INFO</th>
                    <th className="px-6 py-4">AGENT_LINK</th>
                    <th className="px-6 py-4">AMOUNT</th>
                    <th className="px-6 py-4">UTR_NUMBER</th>
                    <th className="px-6 py-4">PROOF</th>
                    <th className="px-6 py-4 text-right">VERIFICATION_ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--divider)]">
                  {pendingPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{pay.customer}</p>
                        <p className="text-[10px] text-[var(--muted)] font-mono">{pay.id} | {pay.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-600">{pay.agent}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-indigo-600">₹{pay.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 px-2 py-1 rounded font-mono text-[11px] text-slate-700">{pay.utr}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-1 text-indigo-600 hover:underline font-bold text-[10px] uppercase">
                          <ImageIcon size={14} />
                          VIEW_PROOFS
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-all" title="Reject Payment">
                            <X size={18} />
                          </button>
                          <button className="p-2 bg-green-50 text-green-600 border border-green-100 rounded-lg hover:bg-green-600 hover:text-white transition-all" title="Approve Payment">
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
        </div>

        {/* Informational Footer */}
        <div className="mt-8 flex items-center gap-2 p-4 bg-slate-100 border border-slate-200 rounded-xl">
          <ShieldCheck className="text-indigo-600" size={20} />
          <p className="text-[11px] text-slate-600 font-medium tracking-wide">
            WARNING: Approval of payments will immediately credit the linked Agent Wallet and clear the Customer Ledger. This action is immutable and recorded in the audit logs.
          </p>
        </div>
      </main>
    </div>
  );
}
