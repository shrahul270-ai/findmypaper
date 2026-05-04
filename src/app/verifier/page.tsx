"use client";

import React, { useState } from 'react';
import { 
  Check, X, Eye, ShieldCheck, Search, Filter, 
  Image as ImageIcon, User, Building2, Bike, 
  Send, FileText, CheckCircle2, AlertCircle 
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function VerifierDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [payments, setPayments] = useState([
    { 
      id: 'PAY-8821', 
      customerId: 'CUST-1042', 
      customerName: 'Amit Verma', 
      agency: 'Sita Ram Agency', 
      hawker: 'Ramesh Yadav',
      amount: 450, 
      date: '05 May 2026', 
      utr: '123456789012',
      phone: '9876543210',
      type: 'ONLINE'
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
      phone: '9988776655',
      type: 'ONLINE'
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    setPayments(prev => prev.filter(p => p.id !== id));
    setNotification(action === 'APPROVE' ? "Payment approved and credited to Agent!" : "Payment rejected.");
    setTimeout(() => setNotification(null), 3000);
    setSelectedPayment(null);
  };

  const sendReport = () => {
    setNotification("10-Day Summary Report sent to all Agents successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="VERIFIER" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {notification && (
          <div className="fixed top-24 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[200] flex items-center gap-3 animate-slide-in">
            <CheckCircle2 size={20} className="text-emerald-400" />
            <p className="text-xs font-black uppercase tracking-widest">{notification}</p>
          </div>
        )}

        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div>
            <p className="text-indigo-600 text-[10px] font-black tracking-[0.2em] uppercase mb-1">ACCOUNTING_PORTAL: VERIFIER</p>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">PAYMENT_AUDIT_TERMINAL</h1>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by Name, Phone, UTR..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm"
              />
            </div>
            <button 
              onClick={sendReport}
              className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-indigo-100 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Send size={16} /> SEND_10_DAY_AGENT_REPORT
            </button>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg"><ShieldCheck size={20} /></div>
              <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">APPROVAL_QUEUE (ONLINE_ONLY)</h2>
            </div>
            <span className="text-[10px] font-black bg-indigo-600 text-white px-4 py-1.5 rounded-full tracking-widest uppercase">
              {payments.length} PENDING_VERIFICATIONS
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/20">
                  <th className="px-8 py-5">CUSTOMER_DATA</th>
                  <th className="px-8 py-5">HIERARCHY_LINK</th>
                  <th className="px-8 py-5">TRANSACTION_DETAILS</th>
                  <th className="px-8 py-5">PROOF</th>
                  <th className="px-8 py-5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                       <p className="text-xs font-black text-slate-300 uppercase tracking-widest italic">All set! No pending payments for verification.</p>
                    </td>
                  </tr>
                ) : (
                  payments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-8 py-6">
                        <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{pay.customerName}</p>
                        <p className="text-[9px] text-indigo-600 font-black uppercase tracking-widest">{pay.customerId}</p>
                        <p className="text-[9px] text-slate-400 font-bold tracking-widest">{pay.phone}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-[10px] text-slate-600 font-black uppercase tracking-tight">
                            <Building2 size={12} className="text-slate-300" /> {pay.agency}
                          </div>
                          <div className="flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                            <Bike size={12} className="text-slate-200" /> {pay.hawker}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xl font-black text-slate-900 leading-none italic">₹{pay.amount}</p>
                        <p className="text-[8px] font-black text-slate-400 mt-1 uppercase tracking-widest">UTR: {pay.utr}</p>
                      </td>
                      <td className="px-8 py-6">
                        <button 
                          onClick={() => setSelectedPayment(pay)}
                          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-105 transition-all"
                        >
                          <ImageIcon size={14} /> VIEW_SCREENSHOT
                        </button>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-100 group-hover:scale-105 transition-all">
                          <button 
                            onClick={() => handleAction(pay.id, 'REJECT')}
                            className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100 shadow-sm" title="Reject Payment"
                          >
                            <X size={20} />
                          </button>
                          <button 
                            onClick={() => handleAction(pay.id, 'APPROVE')}
                            className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm" title="Approve & Credit Agent"
                          >
                            <Check size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Screenshot Verification Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
          <div className="bg-white max-w-2xl w-full rounded-[3rem] p-10 shadow-2xl relative animate-scale-in overflow-hidden">
            <button 
              onClick={() => setSelectedPayment(null)} 
              className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col md:flex-row gap-10">
               {/* Dummy Screenshot Image */}
               <div className="flex-1 bg-slate-100 rounded-[2rem] aspect-[9/16] flex items-center justify-center border-4 border-slate-50 shadow-inner relative group overflow-hidden">
                  <div className="text-center p-8">
                     <ImageIcon size={64} className="text-slate-300 mx-auto mb-4" />
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">PAYMENT_SCREENSHOT_PREVIEW</p>
                  </div>
                  <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>

               <div className="flex-1 space-y-8">
                  <div>
                    <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">VERIFICATION_DETAILS</p>
                    <h3 className="text-3xl font-black text-slate-900 italic uppercase leading-tight">{selectedPayment.customerName}</h3>
                    <p className="text-xs font-black text-slate-400 mt-1">₹{selectedPayment.amount} • UTR: {selectedPayment.utr}</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                     <div className="flex justify-between border-b border-slate-100 pb-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase">Status</span>
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> WAITING_REVIEW</span>
                     </div>
                     <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic">
                        Please verify that the UTR in screenshot matches the input and amount is correct before submitting.
                     </p>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => handleAction(selectedPayment.id, 'APPROVE')}
                      className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <CheckCircle2 size={20} /> SUBMIT_VERIFICATION
                    </button>
                    <button 
                      onClick={() => handleAction(selectedPayment.id, 'REJECT')}
                      className="w-full bg-white text-rose-600 border-2 border-rose-100 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-rose-50 transition-all"
                    >
                      REJECT_PROOF
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
