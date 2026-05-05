"use client";

import React, { useState } from 'react';
import { 
  Camera, MapPin, CheckCircle2, Circle, Clock, Navigation, 
  Download, FileSpreadsheet, User, CreditCard, DollarSign, 
  X, UserCircle2, Filter, ChevronRight, Wallet, Send, ArrowRight, Printer, ShieldCheck, Search, QrCode, Building2, Phone, Hash, Calendar, Tag, Edit3
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export default function HawkerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'PAID'>('ALL');
  const [showCashModal, setShowCashModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [payMode, setPayMode] = useState<'CASH' | 'ONLINE'>('CASH');
  const [editableAmount, setEditableAmount] = useState<string>('');
  
  const [deliveries, setDeliveries] = useState([
    { id: 'C104', name: 'Anil Mehta', phone: '9876543210', address: 'Flat 402, Green Valley, Rohini', status: 'DELIVERED', pay_mode: 'CASH', amount: 450, payment_status: 'PAID', bill_date: '05 May 2026', plan: 'PREMIUM_MONTHLY' },
    { id: 'C105', name: 'Suresh Kumar', phone: '9988776655', address: 'B-12, Rose Villa, Pitampura', status: 'PENDING', pay_mode: 'ONLINE', amount: 320, payment_status: 'PENDING', plan: 'BASIC_DAILY' },
    { id: 'C106', name: 'Daily Needs Store', phone: '9122334455', address: 'Shop No. 5, Market, Rohini', status: 'DELIVERED', pay_mode: 'CASH', amount: 1200, payment_status: 'PAID', bill_date: '05 May 2026', plan: 'COMMERCIAL_WEEKLY' },
    { id: 'C107', name: 'Priya Singh', phone: '9555666777', address: 'H.No 124, Gali 3, Rohini', status: 'PENDING', pay_mode: 'SCANNER', amount: 500, payment_status: 'PENDING', plan: 'PREMIUM_MONTHLY' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const openBillingModal = (item: any) => {
    setSelectedReceipt(item);
    setEditableAmount(item.amount.toString());
    setPayMode('CASH');
  };

  const executeBillSubmission = (id: string) => {
    const finalAmount = parseFloat(editableAmount) || 0;
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, payment_status: 'PAID', status: 'DELIVERED', pay_mode: payMode, amount: finalAmount, bill_date: new Date().toLocaleDateString() } : d));
    setNotification(`Bill for ${selectedReceipt.name} (₹${finalAmount}) Submitted!`);
    setSelectedReceipt(null);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.phone.includes(searchTerm) || 
      d.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filter === 'PENDING') return d.payment_status === 'PENDING';
    if (filter === 'PAID') return d.payment_status === 'PAID';
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar role="HAWKER" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {notification && (
          <div className="fixed top-24 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[200] flex items-center gap-3 animate-slide-in">
            <CheckCircle2 size={20} className="text-emerald-400" />
            <p className="text-xs font-black uppercase tracking-widest">{notification}</p>
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800 leading-none mb-2">MY_ROUTE_TERMINAL</h1>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">AGENT: SITA RAM AGENCY | Sector 4 - Rohini</p>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase shadow-sm"
              />
            </div>
            <div className="flex gap-2">
               <button onClick={() => setShowHistoryModal(true)} className="bg-white border border-slate-100 text-slate-600 px-4 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-sm">HISTORY</button>
               <button onClick={() => setShowCashModal(true)} className="bg-emerald-600 text-white px-4 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl shadow-emerald-100">SUBMIT_CASH</button>
            </div>
          </div>
        </header>

        {/* Customer List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/20 text-xs font-black uppercase text-slate-400 tracking-widest">
             SETTLEMENT_LOG: {filter}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-50/10">
                  <th className="px-8 py-5">CUSTOMER_&_ID</th>
                  <th className="px-8 py-5">AREA_/_ADDRESS</th>
                  <th className="px-8 py-5">AMOUNT</th>
                  <th className="px-8 py-5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDeliveries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 transition-all"><UserCircle2 size={24} /></div>
                           <div>
                              <p className="font-black text-slate-800 text-sm leading-none mb-1 uppercase italic tracking-tight">{item.name}</p>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.id}</p>
                           </div>
                        </div>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight leading-relaxed">{item.address}</p>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900 italic">₹{item.amount}</td>
                    <td className="px-8 py-6 text-right">
                      {item.payment_status === 'PENDING' ? (
                        <button onClick={() => openBillingModal(item)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-105 transition-all">MARK_PAID</button>
                      ) : (
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-1"><CheckCircle2 size={12} /> SETTLED</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Flexible Billing Modal with Editable Amount & Fix Scanner */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
          <div className="bg-white max-w-lg w-full rounded-[3rem] p-8 md:p-12 shadow-2xl relative animate-scale-in flex flex-col max-h-[95vh] overflow-hidden">
            <button onClick={() => setSelectedReceipt(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors z-20"><X size={24} /></button>
            
            <div className="overflow-y-auto pr-2 scrollbar-hide flex-1">
              <div className="text-center mb-8 border-b border-dashed pb-6">
                 <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">BILLING_TERMINAL</h2>
                 <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">EDITABLE_MANUAL_SUBMISSION</p>
              </div>

              {/* Customer Quick Details */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">CUSTOMER</p>
                    <p className="text-[10px] font-black text-slate-800 uppercase italic">{selectedReceipt.name}</p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">PLAN</p>
                    <p className="text-[10px] font-black text-indigo-600 uppercase italic">{selectedReceipt.plan}</p>
                 </div>
              </div>

              {/* Payment Mode */}
              <div className="mb-8">
                 <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
                   <button onClick={() => setPayMode('CASH')} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2", payMode === 'CASH' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>
                      <DollarSign size={14} /> CASH
                   </button>
                   <button onClick={() => setPayMode('ONLINE')} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2", payMode === 'ONLINE' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>
                      <QrCode size={14} /> ONLINE
                   </button>
                 </div>

                 {/* Scanner Visibility Fix */}
                 {payMode === 'ONLINE' && (
                    <div className="animate-in fade-in zoom-in duration-500 mb-8">
                       <div className="bg-slate-50 w-44 h-44 mx-auto rounded-[2rem] border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden group">
                          <QrCode size={100} className="text-slate-800" />
                          <div className="absolute inset-0 bg-indigo-600/5 group-hover:opacity-0 transition-all"></div>
                       </div>
                       <p className="mt-4 text-center text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] animate-pulse">SCAN_TO_PAY_AGENT</p>
                    </div>
                 )}
              </div>

              {/* Editable Amount Section */}
              <div className="bg-slate-900 p-8 rounded-[2.5rem] mb-8 shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col items-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">MANUAL_BILL_ENTRY</p>
                    <div className="flex items-center gap-3 bg-slate-800/50 px-6 py-4 rounded-[2rem] border border-slate-700 focus-within:border-indigo-500 transition-all w-full max-w-[240px]">
                       <span className="text-3xl font-black text-indigo-500 italic">₹</span>
                       <input 
                        type="number" 
                        value={editableAmount}
                        onChange={(e) => setEditableAmount(e.target.value)}
                        className="bg-transparent text-3xl font-black text-white italic outline-none w-full tracking-tighter"
                        placeholder="0.00"
                       />
                       <Edit3 size={18} className="text-slate-500" />
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                    <DollarSign size={80} />
                 </div>
              </div>
            </div>

            <button 
              onClick={() => executeBillSubmission(selectedReceipt.id)}
              className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
            >
              <CheckCircle2 size={18} /> CONFIRM_&_SUBMIT_BILL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
