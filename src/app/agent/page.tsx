"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Newspaper, CreditCard, Search, CheckCircle2, XCircle, 
  Clock, Filter, ChevronRight, FileSpreadsheet, ArrowUpRight, 
  ArrowDownLeft, History, MessageSquare, ShieldCheck, User, QrCode,
  Download, Printer, AlertCircle, RefreshCw
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState<'PENDING' | 'REJECTED' | 'HISTORY'>('PENDING');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Sample Transaction Data
  const [transactions, setTransactions] = useState([
    { id: 'TX101', name: 'Anil Mehta', phone: '9876543210', amount: 450, type: 'ONLINE', status: 'PENDING', time: '10:30 AM', utr: 'UTR987654321' },
    { id: 'TX102', name: 'Suresh Kumar', phone: '9988776655', amount: 320, type: 'CASH', status: 'PENDING', time: '11:15 AM', utr: null },
    { id: 'TX103', name: 'Priya Dhar', phone: '9555666777', amount: 500, type: 'ONLINE', status: 'REJECTED', reason: 'Incorrect UTR provided', time: '09:00 AM', utr: 'UTR123456789' },
    { id: 'TX104', name: 'Daily Store', phone: '9122334455', amount: 1200, type: 'ONLINE', status: 'PAID', time: 'Yesterday', utr: 'UTR11223344' },
  ]);

  const handleApprove = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'PAID' } : t));
  };

  const handleReject = () => {
    if (!rejectReason) return alert("Please provide a reason for rejection.");
    setTransactions(prev => prev.map(t => t.id === selectedTx.id ? { ...t, status: 'REJECTED', reason: rejectReason } : t));
    setShowRejectModal(false);
    setRejectReason('');
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.phone.includes(searchTerm);
    if (activeTab === 'PENDING') return t.status === 'PENDING' && matchesSearch;
    if (activeTab === 'REJECTED') return t.status === 'REJECTED' && matchesSearch;
    if (activeTab === 'HISTORY') return (t.status === 'PAID' || t.status === 'REJECTED') && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="AGENT" />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">ACCOUNTING_PORTAL: VERIFIER</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">PAYMENT_AUDIT_TERMINAL</h1>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH NAME, PHONE, UTR..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </header>

        {/* Audit Tabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm mb-8 overflow-x-auto scrollbar-hide max-w-xl">
           {[
             { id: 'PENDING', name: 'APPROVAL_QUEUE', icon: Clock },
             { id: 'REJECTED', name: 'REJECTED_LOG', icon: AlertCircle },
             { id: 'HISTORY', name: 'PAYMENT_HISTORY', icon: History }
           ].map((tab) => (
             <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)} 
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
                activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600"
              )}
             >
               <tab.icon size={14} /> {tab.name}
             </button>
           ))}
        </div>

        {/* Transaction List (Mobile Friendly) */}
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
               <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black italic", 
                        tx.status === 'PAID' ? "bg-emerald-50 text-emerald-600" : 
                        tx.status === 'REJECTED' ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                     )}>
                        {tx.type === 'ONLINE' ? <QrCode size={24} /> : <CreditCard size={24} />}
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <h3 className="font-black text-slate-900 uppercase italic tracking-tight">{tx.name}</h3>
                           {tx.status === 'PAID' && <CheckCircle2 size={14} className="text-emerald-500" />}
                           {tx.status === 'REJECTED' && <AlertCircle size={14} className="text-rose-500" />}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tx.phone} | {tx.time}</p>
                     </div>
                  </div>

                  <div className="flex flex-row md:flex-col justify-between items-end gap-2">
                     <p className="text-2xl font-black italic text-slate-900 tracking-tighter">₹{tx.amount}</p>
                     {tx.utr && <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">UTR: {tx.utr}</p>}
                  </div>

                  <div className="flex items-center gap-3">
                     {tx.status === 'PENDING' && (
                       <>
                          <button 
                            onClick={() => { setSelectedTx(tx); setShowRejectModal(true); }}
                            className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                          >
                             <XCircle size={20} />
                          </button>
                          <button 
                            onClick={() => handleApprove(tx.id)}
                            className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          >
                             <CheckCircle2 size={20} />
                          </button>
                       </>
                     )}
                     {tx.status === 'REJECTED' && (
                        <button 
                          onClick={() => handleApprove(tx.id)}
                          className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
                        >
                           <RefreshCw size={12} /> RE-APPROVE
                        </button>
                     )}
                     {tx.status === 'PAID' && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl">
                           <ShieldCheck size={14} />
                           <span className="text-[9px] font-black uppercase tracking-widest">VERIFIED</span>
                        </div>
                     )}
                  </div>
               </div>

               {tx.status === 'REJECTED' && tx.reason && (
                  <div className="mt-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-100 border-dashed">
                     <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-1 flex items-center gap-1"><MessageSquare size={10} /> REJECTION_COMMENT</p>
                     <p className="text-[11px] font-bold text-slate-700 italic">"{tx.reason}"</p>
                  </div>
               )}
            </div>
          ))}
        </div>
      </main>

      {/* Reject Modal with Mandatory Comment */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-sm w-full rounded-[2.5rem] p-10 shadow-2xl relative animate-scale-in">
             <button onClick={() => setShowRejectModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"><XCircle size={24} /></button>
             
             <div className="text-center mb-8">
                <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100"><AlertCircle size={32} /></div>
                <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">REJECT_TRANSACTION</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">FOR: {selectedTx?.name}</p>
             </div>

             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">WHY ARE YOU REJECTING?</label>
                   <textarea 
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="E.g. Incorrect UTR, Screenshot not clear..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500 h-32 resize-none"
                   />
                </div>
                <button 
                  onClick={handleReject}
                  className="w-full bg-rose-600 text-white py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl hover:scale-105 transition-all"
                >
                   CONFIRM_REJECTION
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
