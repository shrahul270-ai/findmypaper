"use client";

import React, { useState } from 'react';
import { 
  Users, Bike, Newspaper, CreditCard, Search, CheckCircle2, XCircle, 
  Clock, Filter, ChevronRight, FileSpreadsheet, ArrowUpRight, 
  ArrowDownLeft, History, MessageSquare, ShieldCheck, User, QrCode,
  Download, Printer, AlertCircle, RefreshCw, Layers, Activity
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function AgentDashboard() {
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

  const pendingTxs = transactions.filter(t => t.status === 'PENDING' && (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.phone.includes(searchTerm)));
  const rejectedTxs = transactions.filter(t => t.status === 'REJECTED' && (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.phone.includes(searchTerm)));
  const historyTxs = transactions.filter(t => t.status === 'PAID' && (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.phone.includes(searchTerm)));

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
            <div className="relative flex-1 md:w-80 text-slate-900">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH NAME, PHONE, UTR..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
               <FileSpreadsheet size={16} /> DISPATCH_REPORT
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Section 1: Approval Queue (2/3 width) */}
           <div className="lg:col-span-2 space-y-10">
              <section>
                 <div className="flex items-center gap-3 mb-6 px-4">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg"><Clock size={16} /></div>
                    <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">APPROVAL_QUEUE (PENDING)</h2>
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black">{pendingTxs.length}</span>
                 </div>
                 
                 <div className="space-y-4">
                    {pendingTxs.map((tx) => (
                       <div key={tx.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                          <div className="flex justify-between items-center gap-6">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black italic"><User size={24} /></div>
                                <div>
                                   <h3 className="font-black text-slate-900 uppercase italic text-sm tracking-tight">{tx.name}</h3>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tx.phone} | {tx.type}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-6">
                                <p className="text-xl font-black italic text-slate-900 tracking-tighter">₹{tx.amount}</p>
                                <div className="flex gap-2">
                                   <button onClick={() => { setSelectedTx(tx); setShowRejectModal(true); }} className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all"><XCircle size={20} /></button>
                                   <button onClick={() => handleApprove(tx.id)} className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><CheckCircle2 size={20} /></button>
                                </div>
                             </div>
                          </div>
                       </div>
                    ))}
                    {pendingTxs.length === 0 && <div className="p-10 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 text-slate-300 font-black uppercase text-[10px] tracking-widest">NO_PENDING_PAYMENTS</div>}
                 </div>
              </section>

              {/* Section 2: Recent History (PhonePe Style) */}
              <section>
                 <div className="flex items-center gap-3 mb-6 px-4">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center shadow-lg"><History size={16} /></div>
                    <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">SETTLEMENT_HISTORY (PAID)</h2>
                 </div>
                 <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-6">
                    {historyTxs.map((tx, i) => (
                       <div key={i} className="flex justify-between items-center p-5 border-b border-slate-50 last:border-none">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><CheckCircle2 size={20} /></div>
                             <div>
                                <p className="font-black text-slate-800 uppercase italic text-sm tracking-tight">{tx.name}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tx.time} | {tx.type}</p>
                             </div>
                          </div>
                          <p className="text-lg font-black text-slate-900 italic tracking-tighter">₹{tx.amount}</p>
                       </div>
                    ))}
                 </div>
              </section>
           </div>

           {/* Section 3: Rejected Log (Sidebar Style, 1/3 width) */}
           <div className="lg:col-span-1">
              <section className="sticky top-8">
                 <div className="flex items-center gap-3 mb-6 px-4">
                    <div className="w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center shadow-lg"><AlertCircle size={16} /></div>
                    <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter text-slate-900">REJECTED_AUDIT</h2>
                    <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black">{rejectedTxs.length}</span>
                 </div>
                 <div className="space-y-4">
                    {rejectedTxs.map((tx) => (
                       <div key={tx.id} className="bg-white p-6 rounded-[2rem] border border-rose-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                          <div className="flex justify-between items-start mb-4">
                             <div className="text-slate-900">
                                <h3 className="font-black text-slate-900 uppercase italic text-xs tracking-tight">{tx.name}</h3>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">₹{tx.amount} | {tx.time}</p>
                             </div>
                             <button onClick={() => handleApprove(tx.id)} className="bg-indigo-600 text-white p-2 rounded-lg shadow-lg hover:scale-110 transition-all"><RefreshCw size={14} /></button>
                          </div>
                          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 border-dashed">
                             <p className="text-[8px] font-black text-rose-600 uppercase tracking-widest mb-1 italic flex items-center gap-1"><MessageSquare size={10} /> REASON</p>
                             <p className="text-[10px] font-bold text-slate-600 italic">"{tx.reason}"</p>
                          </div>
                       </div>
                    ))}
                    {rejectedTxs.length === 0 && <div className="p-10 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100 text-slate-300 font-black uppercase text-[10px] tracking-widest">CLEAN_AUDIT_LOG</div>}
                 </div>
              </section>
           </div>
        </div>
      </main>

      {/* Reject Modal with Mandatory Comment */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-[2.5rem] p-10 shadow-2xl relative animate-scale-in">
             <button onClick={() => setShowRejectModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><XCircle size={24} /></button>
             
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
                <button onClick={handleReject} className="w-full bg-rose-600 text-white py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl hover:scale-105 transition-all">CONFIRM_REJECTION</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
