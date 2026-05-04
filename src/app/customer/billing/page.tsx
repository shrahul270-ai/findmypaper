"use client";

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Wallet, History, ArrowUpRight, ArrowDownLeft, 
  Smartphone, SmartphoneIcon, CreditCard, 
  CheckCircle2, Clock, Filter, Download, UserCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAlert, TopAdBar } from '@/components/ui/Promotions';

export default function BillingPage() {
  const ads = [
    { tag: 'BILL_PROMO', title: 'PAY ADVANCE FOR 6 MONTHS & GET 10% CASHBACK' }
  ];

  const transactions = [
    { id: 'TXN_9921', date: '10 MAY 2026', amount: 275, mode: 'ONLINE (UPI)', recipient: 'Sita Ram Agency', status: 'SUCCESS' },
    { id: 'TXN_9845', date: '12 APR 2026', amount: 300, mode: 'CASH', recipient: 'Ramesh Yadav (Hawker)', status: 'SUCCESS' },
    { id: 'TXN_9712', date: '05 MAR 2026', amount: 250, mode: 'ONLINE', recipient: 'Sita Ram Agency', status: 'SUCCESS' },
  ];

  const upiLink = "upi://pay?pa=sitaramagency@upi&pn=SitaRamAgency&am=275&cu=INR";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <GlobalAlert message="BILLING_INFO: MONTHLY INVOICE FOR MAY IS NOW GENERATED. PAY BEFORE 15TH TO AVOID DISRUPTION." />
      <TopAdBar ads={ads} />
      
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar role="CUSTOMER" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-52px)]">
          <header className="mb-8">
            <p className="text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-1">FINANCIAL_TERMINAL</p>
            <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">BILLING_&_HISTORY</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Quick Pay & Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-6">CURRENT_OUTSTANDING</p>
                  <p className="text-4xl font-black tracking-tighter mb-2 italic uppercase">₹275.00</p>
                  <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mb-8">DUE_DATE: 15 MAY 2026</p>
                  
                  <a 
                    href={upiLink}
                    className="flex items-center justify-center gap-3 bg-white text-indigo-600 w-full py-5 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-xl hover:scale-[1.02] transition-all"
                  >
                    <SmartphoneIcon size={18} /> PAY_VIA_UPI_APPS
                  </a>
                </div>
                <CreditCard className="absolute -right-12 -bottom-12 w-48 h-48 opacity-10 rotate-12" />
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">BILLING_WALKTHROUGH</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center py-3 border-b border-slate-50">
                      <span className="text-xs font-bold text-slate-500">Monthly Services</span>
                      <span className="text-xs font-black text-slate-900">₹275.00</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-slate-50">
                      <span className="text-xs font-bold text-slate-500">Arrears/Pending</span>
                      <span className="text-xs font-black text-slate-900">₹0.00</span>
                   </div>
                   <div className="flex justify-between items-center py-3">
                      <span className="text-xs font-bold text-slate-500">Advance Balance</span>
                      <span className="text-xs font-black text-emerald-500">-₹450.00</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><History size={18} /></div>
                    <h2 className="text-xs font-black tracking-widest uppercase text-slate-400">PAYMENT_HISTORY</h2>
                  </div>
                  <button className="text-[10px] font-black text-indigo-600 uppercase flex items-center gap-2 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">
                    <Download size={14} /> EXPORT_STATEMENT
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[9px] uppercase font-bold text-slate-400">
                      <tr>
                        <th className="px-8 py-4">DATE_&_ID</th>
                        <th className="px-8 py-4">RECIPIENT_&_MODE</th>
                        <th className="px-8 py-4 text-right">AMOUNT</th>
                        <th className="px-8 py-4 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {transactions.map((txn) => (
                        <tr key={txn.id} className="hover:bg-slate-50/50 transition-all group">
                          <td className="px-8 py-6">
                            <p className="text-sm font-black text-slate-800">{txn.date}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{txn.id}</p>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                                  <UserCircle2 size={16} />
                               </div>
                               <div>
                                 <p className="text-xs font-black text-slate-700 uppercase">{txn.recipient}</p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase">{txn.mode}</p>
                               </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <p className="text-base font-black text-slate-900 tracking-tighter">₹{txn.amount}.00</p>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase">
                                <CheckCircle2 size={10} /> {txn.status}
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
    </div>
  );
}
