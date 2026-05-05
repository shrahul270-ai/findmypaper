"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Search, CheckCircle2, XCircle, Clock, AlertCircle, 
  ArrowUpRight, ArrowDownLeft, Filter, Download, MoreVertical,
  Mail, Phone, ShieldCheck, User, X, Check, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define Transaction Type for TS
interface Transaction {
  id: string;
  name: string;
  phone: string;
  amount: number;
  type: string;
  status: string;
  reason: string;
  time: string;
  utr: string; // Ensure string
}

export default function AgentAuditDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TXN_101', name: 'Amit Verma', phone: '9876543210', amount: 450, type: 'Credit', status: 'PENDING', reason: '', time: '10:45 AM', utr: 'UTR_8872' },
    { id: 'TXN_102', name: 'Priya Dhar', phone: '9988776655', amount: 320, type: 'Debit', status: 'REJECTED', reason: 'Invalid screenshot', time: '09:15 AM', utr: 'UTR_9901' },
    { id: 'TXN_103', name: 'Suresh Kumar', phone: '9555666777', amount: 500, type: 'Credit', status: 'PENDING', reason: '', time: '08:30 AM', utr: 'UTR_2234' },
  ]);

  const handleApprove = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'PAID' } : t));
  };

  const openReject = (tx: Transaction) => {
    setSelectedTx(tx);
    setShowRejectModal(true);
  };

  const confirmRejection = () => {
    if (!rejectReason || !selectedTx) return;
    setTransactions(prev => prev.map(t => t.id === selectedTx.id ? { ...t, status: 'REJECTED', reason: rejectReason } : t));
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedTx(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-6 md:p-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1 italic">Audit_Terminal</p>
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">DEPOT_CONTROL</h1>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Pending</p><p className="text-xl font-black text-slate-900">₹1,250</p></div>
             <div className="bg-slate-900 px-6 py-4 rounded-2xl shadow-xl text-white"><p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Awaiting Verification</p><p className="text-xl font-black">₹40,000</p></div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Left: Pending Approvals */}
           <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest italic mb-8 border-b pb-4">Awaiting_Your_Approval</h2>
              <div className="space-y-4">
                 {transactions.filter(t => t.status === 'PENDING').map(tx => (
                    <div key={tx.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 font-black italic">A</div>
                          <div>
                             <p className="text-sm font-black text-slate-900 uppercase italic tracking-tighter">{tx.name}</p>
                             <p className="text-[10px] font-bold text-slate-400">{tx.phone}</p>
                          </div>
                       </div>
                       <div className="text-right flex items-center gap-6">
                          <div>
                             <p className="text-base font-black text-slate-900 italic">₹{tx.amount}</p>
                             <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest italic">UTR: {tx.utr}</p>
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => openReject(tx)} className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><X size={18}/></button>
                             <button onClick={() => handleApprove(tx.id)} className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><Check size={18}/></button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Right: Rejection History */}
           <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-8 shadow-inner">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest italic mb-8 border-b pb-4 text-rose-500">Recently_Rejected_Logs</h2>
              <div className="space-y-4 opacity-75">
                 {transactions.filter(t => t.status === 'REJECTED').map(tx => (
                    <div key={tx.id} className="p-6 bg-white rounded-3xl border border-slate-200 flex items-center justify-between">
                       <div>
                          <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">{tx.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded uppercase tracking-tighter border border-rose-100">REJECTED</span>
                             <p className="text-[10px] font-bold text-slate-400 italic">Reason: {tx.reason}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-black text-slate-900 italic">₹{tx.amount}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">{tx.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </main>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl animate-in scale-in duration-200">
             <div className="flex justify-between items-center mb-6"><h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Audit Rejection</h2><button onClick={() => setShowRejectModal(false)}><X size={20}/></button></div>
             <p className="text-xs text-slate-500 mb-6 font-medium">Explain rejection to <strong>{selectedTx?.name}</strong>.</p>
             <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="e.g. UTR mismatch..." className="w-full bg-[#F4F7FE] border-none rounded-2xl p-5 text-xs font-bold text-slate-700 outline-none h-32 resize-none" />
             <div className="flex gap-4 mt-8"><button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 text-[10px] font-bold text-slate-400 uppercase">Back</button><button onClick={confirmRejection} className="flex-2 py-3 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all" disabled={!rejectReason}>Confirm Reject</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
