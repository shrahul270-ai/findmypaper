"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, Download, ChevronDown, User, 
  Building2, Bike, Newspaper, CheckCircle2, XCircle, 
  Clock, ArrowUpRight, ArrowDownLeft, MoreVertical,
  Mail, Hash, Calendar, DollarSign, Wallet, AlertCircle, X, PhoneCall, RefreshCw,
  Image as ImageIcon, Eye, ShieldCheck
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function VerifierDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Sample Data
  const [transactions, setTransactions] = useState([
    { 
      id: '5101', 
      email: 'amit.verma@findmypaper.com', 
      name: 'Amit Verma', 
      phone: '+91 98765 43210',
      addedBy: 'Ramesh (Hawker)', 
      paper: 'Dainik Bhaskar', 
      amount: 450.00, 
      status: 'PENDING',
      time: 'May 05, 2026, 11:23 PM',
      paymentId: 'TXN_AE657A2B',
      proof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400' // Placeholder for receipt
    },
    { 
      id: '2182', 
      email: 'priya.dhar@gmail.com', 
      name: 'Priya Dhar', 
      phone: '+91 99887 76655',
      addedBy: 'Amit (Agent)', 
      paper: 'TOI + Amar Ujala', 
      amount: 320.00, 
      status: 'PENDING',
      time: 'May 05, 2026, 11:16 PM',
      paymentId: '-',
      proof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: '9756', 
      email: 'suresh.kumar@outlook.com', 
      name: 'Suresh Kumar', 
      phone: '+91 95556 66777',
      addedBy: 'Rahul (Hawker)', 
      paper: 'India Today (Mag)', 
      amount: 69.00, 
      status: 'REJECTED',
      reason: 'Invalid UTR Number',
      time: 'May 05, 2026, 11:11 PM',
      paymentId: 'TXN_COOPERS',
      proof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400'
    }
  ]);

  const handleApprove = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'PAID' } : t));
    setShowProofModal(false);
    setSelectedTx(null);
  };

  const openRejectFromModal = () => {
    setShowProofModal(false);
    setShowRejectModal(true);
  };

  const confirmRejection = () => {
    if (!rejectReason) return;
    setTransactions(prev => prev.map(t => t.id === selectedTx.id ? { ...t, status: 'REJECTED', reason: rejectReason } : t));
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedTx(null);
  };

  const filteredTransactions = transactions.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.phone.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-xl font-bold text-[#2B3674]">Payment Audit Center</h1>
           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
              <ShieldCheck size={16} className="text-indigo-600" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Evidence-Based Audit v8.5</p>
           </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F4F7FE] rounded-full flex items-center justify-center text-[#4318FF]"><DollarSign size={20} /></div>
              <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Audited</p><p className="text-xl font-black text-[#2B3674]">₹34,938.92</p></div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600"><CheckCircle2 size={20} /></div>
              <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Paid Payment</p><p className="text-xl font-black text-[#2B3674]">₹28,450.00</p></div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500"><AlertCircle size={20} /></div>
              <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pending Payment</p><p className="text-xl font-black text-[#2B3674]">₹40,332.07</p></div>
           </div>
        </div>

        {/* Main Audit List */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
           <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
              <div className="relative w-full md:w-96 text-slate-900">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                 <input 
                  type="text" 
                  placeholder="Search customer, mobile..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F4F7FE] border-none rounded-xl text-xs font-semibold text-[#2B3674] outline-none focus:ring-2 focus:ring-indigo-600"
                 />
              </div>
              <div className="flex gap-3">
                 <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg hover:scale-105 transition-all"><Download size={14}/> Export Log</button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <th className="px-4 py-5">Customer Profile</th>
                       <th className="px-4 py-5">Mobile</th>
                       <th className="px-4 py-5">Added By</th>
                       <th className="px-4 py-5 text-indigo-600">Items/Paper</th>
                       <th className="px-4 py-5 text-right">Amount</th>
                       <th className="px-4 py-5">Proof</th>
                       <th className="px-4 py-5 text-right">Verification</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {filteredTransactions.map((tx) => (
                       <tr key={tx.id} className="hover:bg-slate-50/50 transition-all group">
                          <td className="px-4 py-6">
                             <p className="text-xs font-bold text-[#2B3674] leading-none mb-1 uppercase tracking-tight">{tx.name}</p>
                             <p className="text-[9px] text-slate-400 font-medium">{tx.email}</p>
                          </td>
                          <td className="px-4 py-6 text-[10px] font-black text-indigo-600 italic">{tx.phone}</td>
                          <td className="px-4 py-6 text-[10px] font-bold text-slate-500 uppercase">{tx.addedBy}</td>
                          <td className="px-4 py-6">
                             <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-indigo-100">{tx.paper}</span>
                          </td>
                          <td className="px-4 py-6 text-sm font-black text-[#2B3674] text-right italic">₹{tx.amount.toFixed(2)}</td>
                          <td className="px-4 py-6">
                             <button 
                              onClick={() => { setSelectedTx(tx); setShowProofModal(true); }}
                              className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md hover:bg-indigo-600 transition-all"
                             >
                                <Eye size={12} /> View
                             </button>
                          </td>
                          <td className="px-4 py-6 text-right">
                             <div className="flex justify-end gap-2">
                                {tx.status === 'PENDING' ? (
                                   <>
                                      <button onClick={() => { setSelectedTx(tx); setShowRejectModal(true); }} className="w-8 h-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><X size={14}/></button>
                                      <button onClick={() => handleApprove(tx.id)} className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><CheckCircle2 size={14}/></button>
                                   </>
                                ) : (
                                   <span className={cn("px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest", tx.status === 'PAID' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600")}>{tx.status}</span>
                                )}
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </main>

      {/* Proof Modal - GIANT PREVIEW */}
      {showProofModal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[200] p-4 text-slate-900">
           <div className="bg-white max-w-2xl w-full rounded-[3rem] p-8 shadow-2xl relative animate-in zoom-in duration-300">
              <button onClick={() => setShowProofModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"><XCircle size={32}/></button>
              <div className="flex flex-col md:flex-row gap-8">
                 <div className="flex-1 bg-slate-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center min-h-[400px]">
                    <img src={selectedTx?.proof} alt="Payment Proof" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 flex flex-col justify-between py-4">
                    <div className="space-y-6">
                       <div>
                          <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-1 italic">TRANSACTION_DETAILS</p>
                          <h2 className="text-3xl font-black text-[#2B3674] italic uppercase tracking-tighter leading-none">{selectedTx?.name}</h2>
                          <p className="text-sm font-bold text-slate-400 mt-1">{selectedTx?.phone}</p>
                       </div>
                       <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-400 uppercase">Amount</span><span className="text-lg font-black text-[#2B3674]">₹{selectedTx?.amount}</span></div>
                          <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-400 uppercase">Paper</span><span className="text-[10px] font-bold text-indigo-600">{selectedTx?.paper}</span></div>
                          <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-400 uppercase">UTR_ID</span><span className="text-[10px] font-mono text-slate-600">{selectedTx?.paymentId}</span></div>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={openRejectFromModal} className="flex-1 py-4 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-rose-600 hover:text-white transition-all border border-rose-100">REJECT_BILL</button>
                       <button onClick={() => handleApprove(selectedTx.id)} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">APPROVE_PAYMENT</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[210] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl animate-in scale-in duration-200">
             <div className="flex justify-between items-center mb-6"><h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Audit Rejection</h2><button onClick={() => setShowRejectModal(false)}><X size={20}/></button></div>
             <p className="text-xs text-slate-500 mb-6">Explain rejection to <strong>{selectedTx?.name}</strong>.</p>
             <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="e.g. UTR mismatch..." className="w-full bg-[#F4F7FE] border-none rounded-2xl p-5 text-xs font-bold text-slate-700 outline-none h-32 resize-none" />
             <div className="flex gap-4 mt-8"><button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 text-[10px] font-bold text-slate-400 uppercase">Back</button><button onClick={confirmRejection} className="flex-2 py-3 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-rose-100 hover:bg-rose-600" disabled={!rejectReason}>Confirm Reject</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
