"use client";

import React, { useState } from 'react';
import { 
  Check, X, Eye, ShieldCheck, Search, Filter, 
  Image as ImageIcon, User, Building2, Bike, 
  Send, FileText, CheckCircle2, AlertCircle, ChevronDown, UserCircle2,
  Clock, XCircle, History, MessageSquare, RefreshCw, QrCode, PhoneCall
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function VerifierDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  // Expanded Transaction Data for Verifier
  const [payments, setPayments] = useState([
    { id: 'PAY-8821', customerName: 'Amit Verma', agency: 'Sita Ram Agency', hawker: 'Ramesh Yadav', amount: 450, status: 'PENDING', utr: 'UTR123456789012', phone: '+91 98765 43210', time: '10:30 AM' },
    { id: 'PAY-8822', customerName: 'Priya Dhar', agency: 'Metro News', hawker: 'Amit Singh', amount: 320, status: 'PENDING', utr: 'UTR987654321098', phone: '+91 99887 76655', time: '11:15 AM' },
    { id: 'PAY-8823', customerName: 'Suresh Kumar', agency: 'Aggarwal Dist', hawker: 'Rahul Sharma', amount: 500, status: 'REJECTED', reason: 'UTR Number Mismatch', utr: 'UTR000000000', phone: '+91 95556 66777', time: '09:00 AM' },
    { id: 'PAY-8824', customerName: 'Daily Store', agency: 'Metro News', hawker: 'Amit Singh', amount: 1200, status: 'PAID', utr: 'UTR1122334455', phone: '+91 91223 34455', time: 'Yesterday' },
  ]);

  const handleAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    if (action === 'REJECT') {
      const tx = payments.find(p => p.id === id);
      setSelectedPayment(tx);
      setShowRejectModal(true);
      return;
    }
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'PAID' } : p));
  };

  const confirmRejection = () => {
    if (!rejectReason) return alert("Please provide a reason for rejection.");
    setPayments(prev => prev.map(p => p.id === selectedPayment.id ? { ...p, status: 'REJECTED', reason: rejectReason } : p));
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedPayment(null);
  };

  const filteredPayments = payments.filter(p => 
    p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.phone.includes(searchTerm) || 
    p.utr.includes(searchTerm)
  );

  const pendingQueue = filteredPayments.filter(p => p.status === 'PENDING');
  const rejectedLog = filteredPayments.filter(p => p.status === 'REJECTED');
  const historyLog = filteredPayments.filter(p => p.status === 'PAID');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <p className="text-indigo-600 text-[10px] font-black tracking-[0.3em] uppercase mb-1 italic">ACCOUNTING_PORTAL: VERIFIER_CONSOLE</p>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">PAYMENT_AUDIT_TERMINAL</h1>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="relative flex-1 md:w-96 text-slate-900">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="SEARCH NAME, PHONE, UTR..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-[2rem] text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-indigo-100 outline-none shadow-xl shadow-slate-200/50 transition-all"
              />
            </div>
            <button onClick={() => setShowReportModal(true)} className="bg-indigo-600 text-white px-8 py-4 rounded-[2rem] font-black text-[11px] tracking-widest uppercase shadow-2xl shadow-indigo-200 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
              <Send size={18} /> DISPATCH_REPORT
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {/* Section 1: Approval Queue (Center Piece) */}
           <div className="lg:col-span-2 space-y-12">
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center justify-between mb-8 px-6">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100"><ShieldCheck size={24} /></div>
                       <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">APPROVAL_QUEUE (ONLINE)</h2>
                    </div>
                    <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[11px] font-black italic">{pendingQueue.length} PENDING</span>
                 </div>

                 <div className="space-y-5">
                    {pendingQueue.map((pay) => (
                       <div key={pay.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all group relative overflow-hidden">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                             <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                                   <UserCircle2 size={32} />
                                </div>
                                <div>
                                   <p className="font-black text-slate-900 text-lg leading-none mb-1 uppercase italic tracking-tighter">{pay.customerName}</p>
                                   <p className="text-[11px] text-indigo-600 font-black uppercase tracking-widest mb-1 italic">{pay.agency} • {pay.hawker}</p>
                                   <p className="text-[9px] text-slate-400 font-black tracking-widest flex items-center gap-1"><PhoneCall size={10} /> {pay.phone}</p>
                                </div>
                             </div>

                             <div className="flex flex-col items-end gap-1">
                                <p className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none mb-1">₹{pay.amount}</p>
                                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">UTR: {pay.utr}</p>
                             </div>

                             <div className="flex gap-4 w-full md:w-auto">
                                <button onClick={() => handleAction(pay.id, 'REJECT')} className="flex-1 md:w-14 h-14 bg-rose-50 text-rose-600 rounded-[1.5rem] flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all border border-rose-100 shadow-sm"><X size={28} /></button>
                                <button onClick={() => handleAction(pay.id, 'APPROVE')} className="flex-1 md:w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm"><Check size={28} /></button>
                             </div>
                          </div>
                       </div>
                    ))}
                    {pendingQueue.length === 0 && (
                      <div className="p-20 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100 text-slate-300">
                         <CheckCircle2 size={64} className="mx-auto mb-4 opacity-20" />
                         <p className="font-black uppercase italic tracking-widest text-xs">QUEUE_CLEARED_SUCCESSFULLY</p>
                      </div>
                    )}
                 </div>
              </section>

              {/* Section 2: Settlement History (PhonePe Style) */}
              <section className="animate-in fade-in duration-700">
                 <div className="flex items-center gap-4 mb-8 px-6">
                    <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-xl shadow-emerald-100"><History size={24} /></div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">SETTLEMENT_HISTORY (PAID)</h2>
                 </div>
                 <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden p-8">
                    {historyLog.map((tx, i) => (
                       <div key={i} className="flex justify-between items-center p-6 border-b border-slate-50 last:border-none hover:bg-slate-50 transition-all rounded-[2rem]">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner"><CheckCircle2 size={24} /></div>
                             <div>
                                <p className="font-black text-slate-900 uppercase italic text-base tracking-tighter">{tx.customerName}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tx.time} | {tx.agency}</p>
                             </div>
                          </div>
                          <p className="text-2xl font-black text-slate-900 italic tracking-tighter">₹{tx.amount}</p>
                       </div>
                    ))}
                    {historyLog.length === 0 && <p className="p-10 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">NO_SETTLEMENTS_TODAY</p>}
                 </div>
              </section>
           </div>

           {/* Section 3: Rejected Audit Log (Separate Sidebar Log) */}
           <div className="lg:col-span-1">
              <section className="sticky top-10 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex items-center gap-3">
                       <div className="p-3 bg-rose-600 rounded-2xl text-white shadow-xl shadow-rose-100"><AlertCircle size={20} /></div>
                       <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">REJECTED_LOG</h2>
                    </div>
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-black italic">{rejectedLog.length} CASES</span>
                 </div>
                 
                 <div className="space-y-6">
                    {rejectedLog.map((tx) => (
                       <div key={tx.id} className="bg-white p-6 rounded-[2.5rem] border border-rose-100 shadow-xl relative overflow-hidden group hover:border-indigo-600 transition-all">
                          <div className="flex justify-between items-start mb-4">
                             <div>
                                <h3 className="font-black text-slate-900 uppercase italic text-sm tracking-tight leading-none mb-1">{tx.customerName}</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">₹{tx.amount} | {tx.time}</p>
                             </div>
                             <button 
                                onClick={() => handleAction(tx.id, 'APPROVE')}
                                className="w-10 h-10 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-all flex items-center justify-center"
                             >
                                <RefreshCw size={16} />
                             </button>
                          </div>
                          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 border-dashed">
                             <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-1 italic flex items-center gap-1"><MessageSquare size={12} /> REASON</p>
                             <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed">"{tx.reason}"</p>
                          </div>
                       </div>
                    ))}
                    {rejectedLog.length === 0 && (
                      <div className="p-10 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 text-slate-200">
                         <p className="font-black uppercase italic tracking-widest text-[9px]">NO_REJECTED_PAYMENTS</p>
                      </div>
                    )}
                 </div>
              </section>
           </div>
        </div>
      </main>

      {/* Reject Modal with Mandatory Comment */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[200] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-[3.5rem] p-10 shadow-2xl relative animate-scale-in border-4 border-white">
             <button onClick={() => setShowRejectModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><XCircle size={24} /></button>
             
             <div className="text-center mb-10">
                <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border-2 border-rose-100 shadow-inner"><AlertCircle size={40} /></div>
                <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-2">REJECT_BILL</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CUSTOMER: {selectedPayment?.customerName}</p>
             </div>

             <div className="space-y-8">
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block px-2">WHY ARE YOU REJECTING?</label>
                   <textarea 
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="E.g. Incorrect UTR number provided, Screenshot not clear..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-6 text-xs font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-100 h-40 resize-none transition-all placeholder:text-slate-300"
                   />
                </div>
                <button 
                  onClick={confirmRejection}
                  className="w-full bg-rose-600 text-white py-5 rounded-[2rem] font-black text-[12px] tracking-[0.2em] uppercase shadow-2xl shadow-rose-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                   <XCircle size={20} /> CONFIRM_REJECTION
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Dispatch Report Modal */}
      {showReportModal && (
         <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[200] p-4 text-slate-900">
            <div className="bg-white max-w-lg w-full rounded-[4rem] p-12 shadow-2xl relative animate-scale-in overflow-hidden border-4 border-white">
               <button onClick={() => setShowReportModal(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors"><X size={32} /></button>
               <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter text-center mb-10">DISPATCH_TERMINAL</h2>
               <div className="space-y-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">SELECT_TARGET_FOR_AUDIT_REPORT</p>
                  <div className="grid grid-cols-1 gap-4">
                     {['METRO_NEWS_AGENCY', 'SITA_RAM_AGENCY', 'RAHUL_HAWKER_GROUP'].map(n => (
                        <button key={n} className="w-full p-6 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-[2.5rem] border border-slate-100 font-black text-[11px] uppercase italic tracking-widest text-slate-700 transition-all flex justify-between items-center group shadow-sm">
                           {n} <Send size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
