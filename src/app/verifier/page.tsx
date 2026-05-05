"use client";

import React, { useState } from 'react';
import { 
  Check, X, ShieldCheck, Search, Image as ImageIcon, 
  User, Building2, Bike, Send, CheckCircle2, AlertCircle, 
  UserCircle2, Clock, History, MessageSquare, RefreshCw, 
  Phone, Hash, ChevronRight, Filter, MoreVertical
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function VerifierDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  // Sample Data with Professional Attributes
  const [payments, setPayments] = useState([
    { id: 'PAY-8821', customerName: 'Amit Verma', agency: 'Sita Ram Agency', hawker: 'Ramesh Yadav', amount: 450, status: 'PENDING', utr: 'UTR123456789012', phone: '+91 98765 43210', time: '10:30 AM' },
    { id: 'PAY-8822', customerName: 'Priya Dhar', agency: 'Metro News', hawker: 'Amit Singh', amount: 320, status: 'PENDING', utr: 'UTR987654321098', phone: '+91 99887 76655', time: '11:15 AM' },
    { id: 'PAY-8823', customerName: 'Suresh Kumar', agency: 'Aggarwal Dist', hawker: 'Rahul Sharma', amount: 500, status: 'REJECTED', reason: 'Incorrect UTR number', utr: 'UTR000000000', phone: '+91 95556 66777', time: '09:00 AM' },
    { id: 'PAY-8824', customerName: 'Daily Store', agency: 'Metro News', hawker: 'Amit Singh', amount: 1200, status: 'PAID', utr: 'UTR1122334455', phone: '+91 91223 34455', time: 'Yesterday' },
  ]);

  const handleAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    if (action === 'REJECT') {
      setSelectedPayment(payments.find(p => p.id === id));
      setShowRejectModal(true);
      return;
    }
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'PAID' } : p));
  };

  const confirmRejection = () => {
    if (!rejectReason) return;
    setPayments(prev => prev.map(p => p.id === selectedPayment.id ? { ...p, status: 'REJECTED', reason: rejectReason } : p));
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedPayment(null);
  };

  const pendingQueue = payments.filter(p => p.status === 'PENDING' && (p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone.includes(searchTerm)));
  const rejectedLog = payments.filter(p => p.status === 'REJECTED');
  const historyLog = payments.filter(p => p.status === 'PAID');

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header Section: Professional & Sharp */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Accounting Portal • Verifier Console</p>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3 italic">
              AUDIT_TERMINAL <span className="text-indigo-600">v7.0</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search payments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              />
            </div>
            <button onClick={() => setShowReportModal(true)} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg">
              <Send size={14} /> DISPATCH
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Primary Audit Queue (Left/Center) */}
           <div className="lg:col-span-8 space-y-10">
              <section>
                 <div className="flex items-center justify-between mb-6 px-2">
                    <div className="flex items-center gap-3">
                       <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Pending Approvals</h2>
                       <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-indigo-100">{pendingQueue.length} Queue</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {pendingQueue.map((pay) => (
                       <div key={pay.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 transition-all shadow-sm group">
                          <div className="flex flex-col md:flex-row justify-between gap-6">
                             <div className="flex-1 flex gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                   <User size={24} />
                                </div>
                                <div className="space-y-1">
                                   <h3 className="font-bold text-slate-900 text-base leading-none">{pay.customerName}</h3>
                                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{pay.agency} <span className="mx-1">•</span> {pay.hawker}</p>
                                   <p className="text-[10px] text-indigo-600 font-bold flex items-center gap-1 mt-1"><Hash size={10} /> {pay.utr}</p>
                                </div>
                             </div>

                             <div className="flex items-center gap-8">
                                <div className="text-right">
                                   <p className="text-xl font-black text-slate-900">₹{pay.amount}</p>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase">{pay.time}</p>
                                </div>
                                <div className="flex gap-2">
                                   <button onClick={() => handleAction(pay.id, 'REJECT')} className="w-10 h-10 bg-white text-rose-500 border border-rose-100 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><X size={18} /></button>
                                   <button onClick={() => handleAction(pay.id, 'APPROVE')} className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"><Check size={18} /></button>
                                </div>
                             </div>
                          </div>
                       </div>
                    ))}
                    {pendingQueue.length === 0 && (
                       <div className="p-16 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                          <CheckCircle2 size={48} className="mx-auto mb-4 text-slate-200" />
                          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No pending audits for now</p>
                       </div>
                    )}
                 </div>
              </section>

              {/* Professional History Table */}
              <section>
                 <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 px-2">Settlement Log</h2>
                 <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-slate-900">
                       <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <th className="px-6 py-4">Customer</th>
                             <th className="px-6 py-4">Reference</th>
                             <th className="px-6 py-4 text-right">Amount</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {historyLog.map((tx, i) => (
                             <tr key={i} className="hover:bg-slate-50/50 transition-all">
                                <td className="px-6 py-4">
                                   <p className="font-bold text-slate-800 text-xs">{tx.customerName}</p>
                                   <p className="text-[9px] text-slate-400 uppercase">{tx.time}</p>
                                </td>
                                <td className="px-6 py-4 font-mono text-[10px] text-slate-400">{tx.utr}</td>
                                <td className="px-6 py-4 text-right font-bold text-slate-900 text-sm">₹{tx.amount}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </section>
           </div>

           {/* Sidebar Rejected Log (Right Side) */}
           <div className="lg:col-span-4">
              <section className="sticky top-10">
                 <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Rejection Audit</h2>
                    <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-md text-[9px] font-bold border border-rose-100">{rejectedLog.length} Issues</span>
                 </div>
                 
                 <div className="space-y-4">
                    {rejectedLog.map((tx) => (
                       <div key={tx.id} className="bg-white border border-rose-100 rounded-2xl p-5 shadow-sm hover:border-indigo-600 transition-all">
                          <div className="flex justify-between items-start mb-3">
                             <div>
                                <h3 className="font-bold text-slate-900 text-xs">{tx.customerName}</h3>
                                <p className="text-[9px] text-slate-400 uppercase tracking-tight">₹{tx.amount} • {tx.time}</p>
                             </div>
                             <button onClick={() => handleAction(tx.id, 'APPROVE')} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"><RefreshCw size={14} /></button>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><MessageSquare size={10} /> Remark</p>
                             <p className="text-[10px] font-medium text-slate-600 italic">"{tx.reason}"</p>
                          </div>
                       </div>
                    ))}
                    {rejectedLog.length === 0 && (
                       <div className="p-10 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
                          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">All clean</p>
                       </div>
                    )}
                 </div>
              </section>
           </div>
        </div>
      </main>

      {/* Professional Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
             <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><AlertCircle size={16} className="text-rose-500" /> Confirm Rejection</h2>
                <button onClick={() => setShowRejectModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
             </div>
             
             <div className="mb-6">
                <p className="text-xs text-slate-500 mb-4">You are rejecting the payment of <span className="font-bold text-slate-900">₹{selectedPayment?.amount}</span> from <span className="font-bold text-slate-900">{selectedPayment?.customerName}</span>.</p>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Reason for Rejection</label>
                <textarea 
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter rejection reason here..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500 h-32 resize-none transition-all"
                />
             </div>

             <div className="flex gap-3">
                <button onClick={() => setShowRejectModal(false)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={confirmRejection} className="flex-2 bg-rose-600 text-white py-3 px-8 rounded-xl font-bold text-[10px] tracking-widest uppercase shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all disabled:opacity-50" disabled={!rejectReason}>Confirm Reject</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
