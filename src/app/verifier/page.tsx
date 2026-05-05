"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, Download, ChevronDown, User, 
  Building2, Bike, Newspaper, CheckCircle2, XCircle, 
  Clock, ArrowUpRight, ArrowDownLeft, MoreVertical,
  Mail, Hash, Calendar, DollarSign, Wallet, AlertCircle, X, PhoneCall
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function VerifierDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Sample Data with Mobile Numbers
  const [transactions, setTransactions] = useState([
    { 
      id: '5101', 
      email: 'amit.verma@findmypaper.com', 
      name: 'Amit Verma', 
      phone: '+91 98765 43210',
      addedBy: 'Ramesh (Hawker)', 
      paper: 'Dainik Bhaskar', 
      amount: 450.00, 
      balance: 902.01, 
      type: 'Credit', 
      status: 'PAID',
      time: 'May 05, 2026, 11:23 PM',
      paymentId: 'TXN_AE657A2B'
    },
    { 
      id: '2182', 
      email: 'priya.dhar@gmail.com', 
      name: 'Priya Dhar', 
      phone: '+91 99887 76655',
      addedBy: 'Amit (Agent)', 
      paper: 'TOI + Amar Ujala', 
      amount: 320.00, 
      balance: -3364.78, 
      type: 'Debit', 
      status: 'PENDING',
      time: 'May 05, 2026, 11:16 PM',
      paymentId: '-'
    },
    { 
      id: '9756', 
      email: 'suresh.kumar@outlook.com', 
      name: 'Suresh Kumar', 
      phone: '+91 95556 66777',
      addedBy: 'Rahul (Hawker)', 
      paper: 'India Today (Mag)', 
      amount: 69.00, 
      balance: 263.70, 
      type: 'Debit', 
      status: 'REJECTED',
      reason: 'Invalid UTR Number',
      time: 'May 05, 2026, 11:11 PM',
      paymentId: 'TXN_COOPERS'
    }
  ]);

  const handleAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    if (action === 'REJECT') {
      setSelectedTx(transactions.find(t => t.id === id));
      setShowRejectModal(true);
      return;
    }
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'PAID', type: 'Credit' } : t));
  };

  const confirmRejection = () => {
    if (!rejectReason) return;
    setTransactions(prev => prev.map(t => t.id === selectedTx.id ? { ...t, status: 'REJECTED', reason: rejectReason, type: 'Debit' } : t));
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedTx(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
           <h1 className="text-xl font-bold text-[#2B3674]">Payment & Audit Transactions</h1>
           <p className="text-xs text-slate-400 font-medium">Verifier Console » <span className="text-slate-600">Wallet-Audit</span></p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F4F7FE] rounded-full flex items-center justify-center text-[#4318FF]"><DollarSign size={20} /></div>
              <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Credit Amount</p><p className="text-xl font-black text-[#2B3674]">34938.92</p></div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-50 flex items-center gap-4 relative overflow-hidden">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600"><CheckCircle2 size={20} /></div>
              <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Paid Payment</p><p className="text-xl font-black text-[#2B3674]">28450.00</p></div>
              <div className="absolute top-2 right-4 text-[7px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified</div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500"><Clock size={20} /></div>
              <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Debit Amount</p><p className="text-xl font-black text-[#2B3674]">40332.07</p></div>
           </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
           <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
              <div className="relative w-full md:w-96">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                 <input 
                  type="text" 
                  placeholder="Search user, mobile, or UTR..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F4F7FE] border-none rounded-xl text-xs font-semibold text-[#2B3674] outline-none focus:ring-2 focus:ring-indigo-600"
                 />
              </div>
              <div className="flex gap-3">
                 <button className="px-5 py-2.5 bg-[#F4F7FE] text-[#2B3674] rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">All Types <ChevronDown size={14}/></button>
                 <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg"><Download size={14}/> Export</button>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                       <th className="px-4 py-5">Wallet User Email</th>
                       <th className="px-4 py-5">User ID</th>
                       <th className="px-4 py-5 text-indigo-600">Mobile Number</th>
                       <th className="px-4 py-5">Added By</th>
                       <th className="px-4 py-5">Items/Paper</th>
                       <th className="px-4 py-5">Amount</th>
                       <th className="px-4 py-5">Transaction Type</th>
                       <th className="px-4 py-5">Added at</th>
                       <th className="px-4 py-5 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {transactions.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.phone.includes(searchTerm)).map((tx) => (
                       <tr key={tx.id} className="hover:bg-slate-50/50 transition-all group">
                          <td className="px-4 py-6">
                             <p className="text-xs font-bold text-[#2B3674] leading-none mb-1">{tx.email}</p>
                             <p className="text-[10px] text-slate-400 font-medium">{tx.name}</p>
                          </td>
                          <td className="px-4 py-6 text-xs font-semibold text-slate-400">#{tx.id}</td>
                          <td className="px-4 py-6">
                             <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px]">
                                <PhoneCall size={12} className="opacity-50" /> {tx.phone}
                             </div>
                          </td>
                          <td className="px-4 py-6 text-[10px] font-bold text-slate-500 uppercase italic">{tx.addedBy}</td>
                          <td className="px-4 py-6">
                             <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">{tx.paper}</span>
                          </td>
                          <td className="px-4 py-6 text-sm font-black text-[#2B3674]">₹{tx.amount.toFixed(2)}</td>
                          <td className="px-4 py-6">
                             <span className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white shadow-sm", 
                                tx.status === 'PAID' ? "bg-emerald-500" : tx.status === 'REJECTED' ? "bg-rose-500" : "bg-amber-500"
                             )}>
                                {tx.status === 'PAID' ? 'Credit' : tx.status === 'REJECTED' ? 'Debit' : 'Pending'}
                             </span>
                          </td>
                          <td className="px-4 py-6 text-[9px] font-medium text-slate-400 whitespace-nowrap">{tx.time}</td>
                          <td className="px-4 py-6 text-right">
                             <div className="flex justify-end gap-2">
                                {tx.status === 'PENDING' ? (
                                   <>
                                      <button onClick={() => handleAction(tx.id, 'REJECT')} className="w-8 h-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><X size={14}/></button>
                                      <button onClick={() => handleAction(tx.id, 'APPROVE')} className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><CheckCircle2 size={14}/></button>
                                   </>
                                ) : (
                                   <MoreVertical size={16} className="text-slate-300" />
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

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-3xl p-8 shadow-2xl animate-in scale-in duration-200">
             <div className="flex justify-between items-center mb-6"><h2 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Audit Rejection</h2><button onClick={() => setShowRejectModal(false)}><X size={20}/></button></div>
             <p className="text-xs text-slate-500 mb-6 font-medium">Explain why you are rejecting <strong>{selectedTx?.name}'s</strong> bill.</p>
             <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="e.g. UTR mismatch, blur screenshot..." className="w-full bg-[#F4F7FE] border-none rounded-2xl p-5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500 h-32 resize-none transition-all" />
             <div className="flex gap-4 mt-8"><button onClick={() => setShowRejectModal(false)} className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Back</button><button onClick={confirmRejection} className="flex-2 py-3 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all" disabled={!rejectReason}>Confirm Reject</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
