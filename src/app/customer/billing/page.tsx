"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Wallet, History, ArrowUpRight, ArrowDownLeft, 
  Smartphone, SmartphoneIcon, CreditCard, 
  CheckCircle2, Clock, Filter, Download, UserCircle2, X, Plus, QrCode, ShieldCheck, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function BillingPage() {
  const [showLogModal, setShowLogModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'ONLINE'>('CASH');
  const [utr, setUtr] = useState('');

  const ads = [
    { tag: 'BILL_PROMO', title: 'PAY ADVANCE FOR 6 MONTHS & GET 10% CASHBACK' },
    { tag: 'LOYALTY_AD', title: 'REFER A NEIGHBOUR & GET ₹50 DISCOUNT ON NEXT BILL' }
  ];

  const transactions = [
    { id: 'TXN_9921', date: '10 MAY 2026', amount: 275, mode: 'ONLINE (APP)', recipient: 'Sita Ram Agency', status: 'SUCCESS' },
    { id: 'TXN_9845', date: '12 APR 2026', amount: 300, mode: 'CASH (MANUAL)', recipient: 'Ramesh Yadav (Hawker)', status: 'SUCCESS' },
    { id: 'TXN_9712', date: '05 MAR 2026', amount: 250, mode: 'ONLINE (MANUAL)', recipient: 'Sita Ram Agency', status: 'SUCCESS' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GlobalAlert message="BILLING_INFO: MONTHLY INVOICE FOR MAY IS NOW GENERATED. PAY BEFORE 15TH TO AVOID DISRUPTION." />
      <TopAdBar ads={ads} />
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Sidebar role="CUSTOMER" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full max-w-7xl mx-auto w-full overflow-x-hidden">
          <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="w-full lg:w-auto">
              <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1 italic">FINANCIAL_TERMINAL</p>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 italic uppercase tracking-tighter">BILLING_&_HISTORY</h1>
            </div>
            <button 
              onClick={() => setShowLogModal(true)}
              className="w-full lg:w-auto bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-2xl shadow-emerald-100 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> LOG_MANUAL_PAYMENT
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Quick Pay Card - Responsive Stack */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-indigo-600 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-6">CURRENT_OUTSTANDING</p>
                  <p className="text-3xl md:text-4xl font-black tracking-tighter mb-2 italic uppercase">₹275.00</p>
                  <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mb-8">DUE_DATE: 15 MAY 2026</p>
                  
                  <button 
                    onClick={() => setShowScannerModal(true)}
                    className="flex items-center justify-center gap-3 bg-white text-indigo-600 w-full py-4 md:py-5 rounded-2xl font-black text-[11px] tracking-widest uppercase shadow-xl hover:scale-[1.02] transition-all"
                  >
                    <SmartphoneIcon size={20} /> PAY_VIA_UPI_APPS
                  </button>
                </div>
                <CreditCard className="absolute -right-12 -bottom-12 w-48 h-48 opacity-10 rotate-12 group-hover:rotate-0 transition-all duration-700" />
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">BILLING_WALKTHROUGH</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center py-4 border-b border-slate-50">
                      <span className="text-xs font-bold text-slate-500">Monthly Services</span>
                      <span className="text-sm font-black text-slate-900 italic">₹275.00</span>
                   </div>
                   <div className="flex justify-between items-center py-4">
                      <span className="text-xs font-bold text-slate-500">Advance Balance</span>
                      <span className="text-sm font-black text-emerald-500 italic">-₹450.00</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Transaction History - Responsive Table */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm"><History size={20} /></div>
                    <h2 className="text-lg font-black tracking-tighter uppercase text-slate-900 italic">PAYMENT_HISTORY</h2>
                  </div>
                  <button className="w-full sm:w-auto text-[10px] font-black text-indigo-600 uppercase flex items-center justify-center gap-2 hover:bg-indigo-50 px-5 py-2.5 rounded-xl transition-all border border-indigo-50">
                    <Download size={16} /> EXPORT
                  </button>
                </div>
                
                <div className="overflow-x-auto -mx-6 md:mx-0">
                  <table className="w-full text-left min-w-[600px] md:min-w-full">
                    <thead className="bg-slate-50/50 text-[9px] uppercase font-black text-slate-400">
                      <tr>
                        <th className="px-6 py-4">DATE_&_ID</th>
                        <th className="px-6 py-4">RECIPIENT_&_MODE</th>
                        <th className="px-6 py-4 text-right">AMOUNT</th>
                        <th className="px-6 py-4 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {transactions.map((txn) => (
                        <tr key={txn.id} className="hover:bg-slate-50/50 transition-all group">
                          <td className="px-6 py-6 md:py-8">
                            <p className="text-xs md:text-sm font-black text-slate-800 italic uppercase">{txn.date}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{txn.id}</p>
                          </td>
                          <td className="px-6 py-6 md:py-8">
                            <div className="flex items-center gap-4">
                               <div className={cn(
                                 "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0",
                                 txn.mode.includes('CASH') ? "bg-amber-500 shadow-amber-100" : "bg-indigo-500 shadow-indigo-100"
                               )}>
                                  {txn.mode.includes('CASH') ? <Wallet size={16} /> : <Smartphone size={16} />}
                               </div>
                               <div className="truncate">
                                 <p className="text-xs font-black text-slate-700 uppercase italic leading-none mb-1 truncate max-w-[120px] md:max-w-none">{txn.recipient}</p>
                                 <p className={cn(
                                   "text-[9px] font-black uppercase tracking-widest",
                                   txn.mode.includes('CASH') ? "text-amber-600" : "text-indigo-600"
                                 )}>{txn.mode}</p>
                               </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 md:py-8 text-right font-black text-slate-900 text-base md:text-lg italic">₹{txn.amount}.00</td>
                          <td className="px-6 py-6 md:py-8 text-right">
                             <span className="inline-flex items-center gap-1.5 px-3 md:px-4 py-1 md:py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase shadow-sm border border-emerald-100 whitespace-nowrap">
                                <CheckCircle2 size={12} /> {txn.status}
                             </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* UPI Scanner Modal - Responsive */}
      {showScannerModal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[220] p-4 text-slate-900">
          <div className="bg-white max-w-sm w-full rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 shadow-2xl relative animate-scale-in text-center border-4 border-white">
             <button onClick={() => setShowScannerModal(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
             <div className="mb-6 border-b border-dashed pb-6">
                <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-slate-900 leading-none mb-2">QUICK_SCAN_PAY</h2>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">FINDMYPAPER OFFICIAL UPI</p>
             </div>
             
             <div className="bg-slate-50 w-48 h-48 md:w-56 md:h-56 rounded-[2.5rem] border-4 border-white shadow-2xl flex items-center justify-center mx-auto mb-8 overflow-hidden group relative">
                <QrCode size={140} className="text-slate-900 group-hover:scale-110 transition-all duration-500" />
             </div>

             <div className="bg-slate-900 p-5 md:p-6 rounded-[2rem] mb-8 md:mb-10 shadow-xl">
                <p className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3 italic">BILL_AMOUNT_TO_PAY</p>
                <p className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">₹275.00</p>
             </div>

             <button 
              onClick={() => { alert("Payment Initiated!"); setShowScannerModal(false); }}
              className="w-full bg-indigo-600 text-white py-4 md:py-5 rounded-[2rem] font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
             >
                <ShieldCheck size={20} /> I_HAVE_PAID_NOW
             </button>
          </div>
        </div>
      )}

      {/* Manual Payment Log Modal - Responsive */}
      {showLogModal && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[220] p-4 text-slate-900">
          <div className="bg-white max-w-md w-full rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative animate-scale-in border-4 border-white overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowLogModal(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"><X size={28} /></button>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 text-center mb-8 uppercase italic tracking-tighter">LOG_OFFLINE_PAYMENT</h2>
            
            <div className="space-y-6 md:space-y-8">
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                 <button 
                  onClick={() => setPaymentMethod('CASH')}
                  className={cn("flex-1 py-3 md:py-4 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest", paymentMethod === 'CASH' ? "bg-white text-indigo-600 shadow-xl" : "text-slate-400")}
                 >CASH</button>
                 <button 
                  onClick={() => setPaymentMethod('ONLINE')}
                  className={cn("flex-1 py-3 md:py-4 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest", paymentMethod === 'ONLINE' ? "bg-white text-indigo-600 shadow-xl" : "text-slate-400")}
                 >ONLINE</button>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">BILL_AMOUNT</p>
                  <input type="number" placeholder="₹ 0.00" className="w-full p-5 md:p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-xl md:text-2xl font-black italic outline-none focus:border-indigo-500 transition-all text-slate-900" />
                </div>

                {paymentMethod === 'ONLINE' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                       <div>
                          <p className="text-[9px] font-black text-indigo-600 uppercase italic">Scan Official QR</p>
                       </div>
                       <button onClick={() => setShowScannerModal(true)} className="bg-white p-2 rounded-lg shadow-sm border border-indigo-100 text-indigo-600 hover:scale-110 transition-all"><QrCode size={20} /></button>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">UTR / TRANSACTION_ID</p>
                       <input 
                        value={utr}
                        onChange={(e) => setUtr(e.target.value)}
                        placeholder="ENTER 12 DIGIT UTR" 
                        className="w-full p-5 md:p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-xs font-black outline-none focus:border-indigo-500 transition-all text-slate-900" 
                       />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">RECIPIENT_PROFILE</p>
                  <select className="w-full p-5 md:p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-[10px] font-black uppercase outline-none text-slate-900">
                     <option>AGENT: SITA RAM AGENCY</option>
                     <option>HAWKER: RAMESH YADAV</option>
                  </select>
                </div>
                
                <button 
                  onClick={() => { alert("Payment logged!"); setShowLogModal(false); }}
                  className="w-full bg-emerald-600 text-white py-5 md:py-6 rounded-[2.5rem] font-black text-[11px] md:text-[12px] tracking-[0.2em] uppercase shadow-2xl hover:scale-105 transition-all mt-4"
                >
                  CONFIRM_PAYMENT_LOG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
